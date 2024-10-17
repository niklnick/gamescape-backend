import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<AuthDto> {
        const user: User = await this.usersService.create(signUpDto);

        return await this.tokenize(user);
    }

    async logIn(logInDto: LogInDto): Promise<AuthDto> {
        const user: User = await this.usersService.findOneByEmail(logInDto.email);

        if (!await compare(logInDto.password, user.password)) throw new UnauthorizedException();

        return await this.tokenize(user);
    }

    async refresh(userId: string): Promise<AuthDto> {
        const user: User = await this.usersService.findOne(userId);

        return await this.tokenize(user);
    }

    private async tokenize(user: User): Promise<AuthDto> {
        const payload: {
            readonly sub: string,
            readonly role: Role
        } = { sub: user.id, role: user.role };

        return {
            user: user,
            accessToken: await this.jwtService.signAsync(payload, { expiresIn: '10m' }),
            refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '24h' })
        };
    }
}
