import { Controller, Post, Res, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { LocalAuthGuard } from "./auth.local.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async signIn(@Res() res: Response, @Req() req: any) {
    console.log("into login");
    try {
      console.log(req.session.passport.user);
      res.send({
        message: req.session.passport.user,
      });
    } catch (error) {
      throw new Error(
        `Something went wrong while signing in the user! \n Error: ${error}`,
      );
    }
  }

  @Post("logout")
  async logOut(@Res({ passthrough: true }) res: Response, @Req() req: any) {
    try {
      // req.session.destroy();
      req.logout(() => {});
      // res.clearCookie("connect.sid").send({
      //   message: "user logged out",
      // });
    } catch (error) {
      throw new Error(
        `Something went wrong while logging out the user! \n Error: ${error}`,
      );
    }
  }
}
