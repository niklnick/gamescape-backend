import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.usersRepository.existsBy({ email: createUserDto.email }))
      throw new ConflictException('Email already assigned');

    const user: User = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save({
      ...user, password: await hash(user.password, await genSalt())
    });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { id: id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { email: email } });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail({ where: { id: id } });

      return await this.usersRepository.save({ ...user, ...updateUserDto });
    } catch {
      throw new NotFoundException();
    }
  }

  async updateEmail(id: string, email: string): Promise<User> {
    if (await this.usersRepository.existsBy({ email: email }))
      throw new ConflictException('Email already assigned');

    try {
      const user: User = await this.usersRepository.findOneOrFail({ where: { id: id } });

      return await this.usersRepository.save({ ...user, email: email });
    } catch {
      throw new NotFoundException();
    }
  }

  async updatePassword(id: string, password: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail({ where: { id: id } });

      return await this.usersRepository.save({
        ...user, password: await hash(password, await genSalt())
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async updateRole(id: string, role: Role): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail({ where: { id: id } });

      return await this.usersRepository.save({ ...user, role: role });
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail({ where: { id: id } });

      return await this.usersRepository.remove(user);
    } catch {
      throw new NotFoundException();
    }
  }
}
