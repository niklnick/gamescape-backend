import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly categoriesRepository: Repository<Category>) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    if (await this.categoriesRepository.existsBy({ title: createCategoryDto.title }))
      throw new ConflictException('Title already assigned');

    return await this.categoriesRepository.save(this.categoriesRepository.create(createCategoryDto));
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: { games: { author: true } } });
  }

  async findOne(id: string): Promise<Category> {
    try {
      return await this.categoriesRepository.findOneOrFail({
        where: { id: id },
        relations: { games: { author: true } }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    if (updateCategoryDto.title && await this.categoriesRepository.existsBy({ title: updateCategoryDto.title }))
      throw new ConflictException('Title already assigned');

    try {
      const category: Category = await this.categoriesRepository.findOneOrFail({ where: { id: id } });

      return await this.categoriesRepository.save({ ...category, ...updateCategoryDto });
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<Category> {
    try {
      const category: Category = await this.categoriesRepository.findOneOrFail({ where: { id: id } });

      return await this.categoriesRepository.remove(category);
    } catch {
      throw new NotFoundException();
    }
  }
}
