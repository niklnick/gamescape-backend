import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Request() request: Request,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    if (request['sub'] !== id) throw new UnauthorizedException();

    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/email')
  @UseGuards(AuthGuard)
  async updateEmail(
    @Request() request: Request,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { email }: UpdateUserEmailDto
  ): Promise<User> {
    if (request['sub'] !== id) throw new UnauthorizedException();

    return this.usersService.updateEmail(id, email);
  }

  @Patch(':id/password')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Request() request: Request,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { password }: UpdateUserPasswordDto
  ): Promise<User> {
    if (request['sub'] !== id) throw new UnauthorizedException();

    return this.usersService.updatePassword(id, password);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Request() request: Request,
    @Param('id', ParseUUIDPipe) id: string): Promise<User> {
    if (request['sub'] !== id) throw new UnauthorizedException();

    return this.usersService.remove(id);
  }
}
