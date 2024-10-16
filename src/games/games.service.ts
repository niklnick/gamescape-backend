import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from 'src/materials/entities/material.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gamesRepository: Repository<Game>,
    private readonly usersService: UsersService
  ) { }

  async create(userId: string, createGameDto: CreateGameDto): Promise<Game> {
    if (await this.gamesRepository.existsBy({ title: createGameDto.title }))
      throw new ConflictException('Title already assigned');

    const author: User = await this.usersService.findOne(userId);
    const game: Game = this.gamesRepository.create({
      ...createGameDto,
      materials: createGameDto.materials?.map((material: Material) => {
        return { ...material, author: author };
      }),
      author: author
    });

    return await this.gamesRepository.save(game);
  }

  async findAll(): Promise<Game[]> {
    return await this.gamesRepository.find({
      relations: {
        categories: true,
        materials: true,
        author: true,
        base: { categories: true, materials: true, author: true },
        variations: { categories: true, materials: true, author: true }
      }
    });
  }

  async findOne(id: string): Promise<Game> {
    try {
      return await this.gamesRepository.findOneOrFail({
        where: { id: id },
        relations: {
          categories: true,
          materials: true,
          author: true,
          base: { categories: true, materials: true, author: true },
          variations: { categories: true, materials: true, author: true }
        }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(userId: string, id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    if (updateGameDto.title && await this.gamesRepository.existsBy({ title: updateGameDto.title }))
      throw new ConflictException('Title already assigned');

    const game: Game | null = await this.gamesRepository.findOne({
      where: { id: id },
      relations: {
        categories: true,
        materials: true,
        author: true,
        base: { categories: true, materials: true, author: true }
      }
    });

    if (!game) throw new NotFoundException();
    if (userId !== game.author.id) throw new UnauthorizedException();

    return await this.gamesRepository.save({ ...game, ...updateGameDto });
  }

  async remove(userId: string, id: string): Promise<Game> {
    const game: Game | null = await this.gamesRepository.findOne({
      where: { id: id },
      relations: { author: true, variations: { author: true } }
    });

    if (!game) throw new NotFoundException();
    if (userId !== game.author.id) throw new UnauthorizedException();

    return await this.gamesRepository.remove(game);
  }
}
