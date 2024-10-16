import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Post()
  async create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return await this.gamesService.create(createGameDto);
  }

  @Get()
  async findAll(): Promise<Game[]> {
    return (await this.gamesService.findAll()).filter((game: Game) => !game.base);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Game> {
    return await this.gamesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Request() request: Request,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGameDto: UpdateGameDto
  ): Promise<Game> {
    return await this.gamesService.update(request['sub'], id, updateGameDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Request() request: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<Game> {
    return await this.gamesService.remove(request['sub'], id);
  }
}
