import { Body, Controller, Post, Res, Req, UseGuards } from '@nestjs/common';
import { SignInAuthDto } from './dto/signIn.auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInAuthDto: SignInAuthDto, @Res() res: Response) {
    try {
      const { email, password } = signInAuthDto;
      const signInObject = await this.authService.signIn(email, password);
      let access_token: string;

      if (signInObject?.message) {
        res.send({
          message: signInObject.message,
          status: 200,
        });
        return signInObject.message;
      } else if (signInObject?.access_token) {
        access_token = signInObject.access_token;
        res
          .cookie('access_token', access_token, {
            httpOnly: true,
            secure: true,
          })
          .send({
            message: 'cookies added',
            status: 200,
          });
      }
    } catch (error) {
      throw new Error(
        `Something went wrong while signing in the user! \n Error: ${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response, @Req() req: any) {
    try {
      console.log(req.user);
      const tokenRemoved = await this.authService.clearRedisCache(req.user.id);
      console.log(tokenRemoved, '\n');

      res
        .clearCookie('access_token', {
          httpOnly: true,
          secure: true,
        })
        .send({
          message: 'cookies removed',
          status: 200,
        });
    } catch (error) {
      throw new Error(
        `Something went wrong while logging out the user! \n Error: ${error}`,
      );
    }
  }
}
