import * as argon2 from 'argon2';
import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

async register(registerDto: RegisterDto) {
  const existingUser = await this.usersService.findByEmail(
    registerDto.email,
  );

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
    });

    return user;
    }
}