import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(@InjectRepository(Game) private readonly gamesRepository: Repository<Game>) { }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    if (await this.gamesRepository.existsBy({ title: createGameDto.title }))
      throw new ConflictException('Title already assigned');

    return await this.gamesRepository.save(this.gamesRepository.create(createGameDto));
  }

  async findAll(): Promise<Game[]> {
    return await this.gamesRepository.find({ relations: { user: true } });
  }

  async findOne(id: string): Promise<Game> {
    try {
      return await this.gamesRepository.findOneOrFail({
        where: { id: id },
        relations: { user: true }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    if (updateGameDto.title && await this.gamesRepository.existsBy({ title: updateGameDto.title }))
      throw new ConflictException('Title already assigned');

    try {
      const game: Game = await this.gamesRepository.findOneOrFail({ where: { id: id } });

      return await this.gamesRepository.save({ ...game, ...updateGameDto });
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<Game> {
    try {
      const game: Game = await this.gamesRepository.findOneOrFail({ where: { id: id } });

      return await this.gamesRepository.remove(game);
    } catch {
      throw new NotFoundException();
    }
  }
}
