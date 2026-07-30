import { Body, Controller, Get, Patch } from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';

import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

import { UserMapper } from './mappers/user.mapper';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@CurrentUser() user: JwtUser) {
    const currentUser = await this.usersService.findByIdOrThrow(user.id);

    return UserMapper.toResponse(currentUser);
  }

  @Patch('me')
  async updateAccount(
    @CurrentUser() user: JwtUser,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const updatedUser = await this.usersService.updateAccount(
      user.id,
      updateAccountDto,
    );

    return UserMapper.toResponse(updatedUser);
  }

  @Patch('me/profile')
  async updateProfile(
    @CurrentUser() user: JwtUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const updatedUser = await this.usersService.updateProfile(
      user.id,
      updateProfileDto,
    );

    return UserMapper.toResponse(updatedUser);
  }
}