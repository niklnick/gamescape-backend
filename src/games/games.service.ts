import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    return await this.gamesRepository.find({
      relations: {
        author: true,
        base: true,
        variations: { author: true },
      }
    });
  }

  async findOne(id: string): Promise<Game> {
    try {
      return await this.gamesRepository.findOneOrFail({
        where: { id: id },
        relations: {
          author: true,
          base: { author: true },
          variations: { author: true },
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
      relations: { author: true }
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
