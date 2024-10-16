import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material) private readonly materialsRepository: Repository<Material>,
    private readonly usersService: UsersService
  ) { }

  async create(userId: string, createMaterialDto: CreateMaterialDto): Promise<Material> {
    if (await this.materialsRepository.existsBy({ title: createMaterialDto.title }))
      throw new ConflictException('Title already assigned');

    const author: User = await this.usersService.findOne(userId);
    const material: Material = this.materialsRepository.create({
      ...createMaterialDto,
      author: author
    });

    return await this.materialsRepository.save(material);
  }

  async findAll(): Promise<Material[]> {
    return await this.materialsRepository.find();
  }

  async findOne(id: string): Promise<Material> {
    try {
      return await this.materialsRepository.findOneOrFail({
        where: { id: id },
        relations: { author: true }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(userId: string, id: string, updateMaterialDto: UpdateMaterialDto): Promise<Material> {
    const material: Material | null = await this.materialsRepository.findOne({
      where: { id: id },
      relations: { author: true }
    });

    if (!material) throw new NotFoundException();
    if (userId !== material.author.id) throw new UnauthorizedException();

    return await this.materialsRepository.save({ ...material, ...updateMaterialDto });
  }

  async remove(userId: string, id: string): Promise<Material> {
    const material: Material | null = await this.materialsRepository.findOne({
      where: { id: id },
      relations: { author: true }
    });

    if (!material) throw new NotFoundException();
    if (userId !== material.author.id) throw new UnauthorizedException();

    return await this.materialsRepository.remove(material);
  }
}
