import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = (await super.canActivate(context)) as boolean;
      const request = context.switchToHttp().getRequest();

      console.log("\n result and request line ran \n");
      await super.logIn(request);
      console.log("session initiated \n");
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Something went wrong while signing the user in localAuthGuard! \n Error: ${error}`,
      );
    }
  }
}
