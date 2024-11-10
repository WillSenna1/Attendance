import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    return await this.authService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() RefreshDto: RefreshTokenAuthDto) {
    return await this.authService.refresh(RefreshDto);
  }
}
