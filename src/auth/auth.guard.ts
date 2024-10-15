import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const [type, token]: string[] = request.headers['authorization']?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) throw new BadRequestException();

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('JWT_SECRET') });

      request['sub'] = payload.sub;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
