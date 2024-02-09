import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest().isAuthenticated();
      console.log("in auth guard for consecutive request \n");
      return request;
    } catch (error) {
      throw new UnauthorizedException(`${error.name} : ${error.message}`);
    }
  }
}
