import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
// import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private extractTokenFromHeader(request: Request) {
    // console.log(request.cookies['access_token']);
    return request.cookies['access_token'];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request.headers);

    const token = this.extractTokenFromHeader(request);
    // console.log(token.access_token);

    if (!token?.access_token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token.access_token, {
        secret: 'movie_app',
      });

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
