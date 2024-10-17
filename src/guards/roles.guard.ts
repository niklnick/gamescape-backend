import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles: Role[] = this.reflector.get<Role[]>('roles', context.getHandler());
    const role: Role = context.switchToHttp().getRequest<Request>()['role'];

    return roles.includes(role);
  }
}
