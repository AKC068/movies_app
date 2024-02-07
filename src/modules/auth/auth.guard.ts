import { JwtService } from "@nestjs/jwt";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { extractTokenFromHeader } from "./auth.utils";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = extractTokenFromHeader(request);

      if (!token) {
        throw new Error("Session expired. Please login again !");
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: "movie_app",
      });

      console.log(payload);

      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`${error.name} : ${error.message}`);
    }
  }
}
