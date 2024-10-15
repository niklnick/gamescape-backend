import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
        return await this.authService.signUp(signUpDto);
    }

    @Post('/log-in')
    @HttpCode(HttpStatus.OK)
    async logIn(@Body() logInDto: LogInDto): Promise<User> {
        return await this.authService.logIn(logInDto);
    }
}
