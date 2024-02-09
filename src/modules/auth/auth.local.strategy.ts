// import { SignInAuthDto } from "./dto/signIn.auth.dto";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    try {
      console.log("validate", username, password, "\n");
      const user = await this.authService.logIn(username, password);
      if (!user) {
        console.log("in exception", "\n");
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new Error(
        `Something went wrong while authenticating the user in local strategy! \n Error: ${error}`,
      );
    }
  }
}
