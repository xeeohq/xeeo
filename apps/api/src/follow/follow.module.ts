import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [UsersModule],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
