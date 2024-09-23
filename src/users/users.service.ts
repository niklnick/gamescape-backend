import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.usersRepository.create(createUserDto);

    if (await this.usersRepository.exists({ where: { email: user.email } })) throw new ConflictException();

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException();

    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string) {
    const user: User | null = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException();

    return await this.usersRepository.remove(user);
  }
}
