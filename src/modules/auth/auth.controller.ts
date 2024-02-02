import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInAuthDto } from './dto/signIn.auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() signInAuthDto: SignInAuthDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const { email, password } = signInAuthDto;
    const access_token = await this.authService.signIn(email, password);

    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: true,
      })
      .send({ status: 'cookies sent' });
  }

  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: any) {
    res
      .clearCookie('access_token', {
        httpOnly: true,
        secure: true,
      })
      .send({ status: 'cookies removed' });
  }
}
