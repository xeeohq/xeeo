import { Injectable, NotFoundException } from '@nestjs/common';

import { FollowService } from '../follow/follow.service';
import { UsersService } from '../users/users.service';

import { DeveloperMapper } from './mappers/developer.mapper';

@Injectable()
export class DeveloperService {
  constructor(
    private readonly usersService: UsersService,
    private readonly followService: FollowService,
  ) {}

  async getDeveloperProfile(username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('Developer not found.');
    }

    const [followers, following] = await Promise.all([
      this.followService.countFollowers(user.id),
      this.followService.countFollowing(user.id),
    ]);

    return DeveloperMapper.toResponse({
      user,
      followers,
      following,
      skills: [],
    });
  }
}