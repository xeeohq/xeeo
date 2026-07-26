import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { FollowService } from './follow.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':id/follow')
  follow(@CurrentUser() user: JwtUser, @Param('id') targetUserId: string) {
    return this.followService.followUser(user.id, targetUserId);
  }

  @Delete(':id/follow')
  unfollow(@CurrentUser() user: JwtUser, @Param('id') targetUserId: string) {
    return this.followService.unfollowUser(user.id, targetUserId);
  }

  @Get(':id/relationship')
  relationship(
    @CurrentUser() user: JwtUser,
    @Param('id') targetUserId: string,
  ) {
    return this.followService.getRelationship(user.id, targetUserId);
  }

  @Get(':id/followers')
  followers(@Param('id') userId: string, @Query() query: PaginationQueryDto) {
    return this.followService.getFollowers(userId, query.page, query.limit);
  }

  @Get(':id/following')
  following(@Param('id') userId: string, @Query() query: PaginationQueryDto) {
    return this.followService.getFollowing(userId, query.page, query.limit);
  }
}
