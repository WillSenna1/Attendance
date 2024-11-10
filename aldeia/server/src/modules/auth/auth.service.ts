import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token-auth.dto';
import { UsersRepository } from '../users/users.repository';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from './models/payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService

  ) { }

  async login({ email, password }: LoginAuthDto) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return await this.generateJwtToken(user);
  }

  async refresh({ token }: RefreshTokenAuthDto) {
    const payload: IPayload = this.jwtService.verify(token);
    if (payload && payload.type !== 'refresh_token') throw new UnauthorizedException('Invalid token');

    const user = await this.userRepository.findById(payload.sub);
    if (!user) throw new UnauthorizedException('Invalid token');

    return await this.generateJwtToken(user)
  }


  private async generateJwtToken(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token_payload = { ...payload, type: 'access_token' };
    const refresh_token_payload = { ...payload, type: 'refresh_token' };

    return {
      access_token: this.jwtService.sign(access_token_payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(refresh_token_payload, { expiresIn: '1d' }),
    };
  }

}
