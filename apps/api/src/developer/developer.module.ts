import { Module } from '@nestjs/common';

import { FollowModule } from '../follow/follow.module';
import { UsersModule } from '../users/users.module';

import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';

@Module({
  imports: [UsersModule, FollowModule],
  controllers: [DeveloperController],
  providers: [DeveloperService],
  exports: [DeveloperService],
})
export class DeveloperModule {}