import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.headers;

    if (!email || !password) {
      return false;
    }

    const user = await this.usersService.validateUser(email, password);

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
