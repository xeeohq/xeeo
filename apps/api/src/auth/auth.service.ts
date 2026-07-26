import * as argon2 from 'argon2';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserMapper } from '../users/mappers/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new BadRequestException('Email is already registered.');
    }

    const existingUsername = await this.usersService.findByUsername(
      registerDto.username,
    );

    if (existingUsername) {
      throw new BadRequestException('Username is already taken.');
    }

    const passwordHash = await argon2.hash(registerDto.password);

    const user = await this.usersService.create({
      email: registerDto.email,
      username: registerDto.username,
      passwordHash,
      displayName: registerDto.displayName,
    });

    return UserMapper.toResponse(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const passwordMatches = await argon2.verify(
      user.passwordHash,
      loginDto.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      user: UserMapper.toResponse(user),
    };
  }

  logout() {
    return {
      message: 'Logged out successfully.',
    };
  }
}
