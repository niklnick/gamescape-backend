import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<AuthDto> {
        return await this.authService.signUp(signUpDto);
    }

    @Post('log-in')
    @HttpCode(HttpStatus.OK)
    async logIn(@Body() logInDto: LogInDto): Promise<AuthDto> {
        return await this.authService.logIn(logInDto);
    }

    @Get('refresh')
    @UseGuards(AuthGuard)
    async refresh(@Request() request: Request): Promise<AuthDto> {
        return await this.authService.refresh(request['sub']);
    }
}
