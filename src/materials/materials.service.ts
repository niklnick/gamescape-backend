import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialsService {
  constructor(@InjectRepository(Material) private readonly materialsRepository: Repository<Material>) { }

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    if (await this.materialsRepository.existsBy({ title: createMaterialDto.title }))
      throw new ConflictException('Title already assigned');

    return await this.materialsRepository.save(this.materialsRepository.create(createMaterialDto));
  }

  async findAll(): Promise<Material[]> {
    return await this.materialsRepository.find();
  }

  async findOne(id: string): Promise<Material> {
    try {
      return await this.materialsRepository.findOne({ where: { id: id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<Material> {
    const material: Material | null = await this.materialsRepository.findOne({ where: { id: id } });

    if (!material) throw new NotFoundException();

    return await this.materialsRepository.save({ ...material, ...updateMaterialDto });
  }

  async remove(id: string): Promise<Material> {
    const material: Material | null = await this.materialsRepository.findOne({ where: { id: id } });

    if (!material) throw new NotFoundException();

    return await this.materialsRepository.remove(material);
  }
}
