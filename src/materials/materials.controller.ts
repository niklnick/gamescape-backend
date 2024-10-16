import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';
import { MaterialsService } from './materials.service';

@Controller()
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) { }

  @Post()
  async create(@Body() createMaterialDto: CreateMaterialDto): Promise<Material> {
    return await this.materialsService.create(createMaterialDto);
  }

  @Get()
  async findAll(): Promise<Material[]> {
    return await this.materialsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Material> {
    return await this.materialsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMaterialDto: UpdateMaterialDto
  ): Promise<Material> {
    return await this.materialsService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Material> {
    return await this.materialsService.remove(id);
  }
}
