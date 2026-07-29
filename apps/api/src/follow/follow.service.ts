import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { UserMapper } from '../users/mappers/user.mapper';

@Injectable()
export class FollowService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async followUser(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      throw new BadRequestException('You cannot follow yourself.');
    }

    await this.usersService.findByIdOrThrow(currentUserId);
    await this.usersService.findByIdOrThrow(targetUserId);

    const existingFollow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      throw new ConflictException('You are already following this user.');
    }

    await this.prisma.follow.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });

    return {
      message: 'User followed successfully.',
    };
  }

  async unfollowUser(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      throw new BadRequestException('You cannot unfollow yourself.');
    }

    const existingFollow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      },
    });

    if (!existingFollow) {
      throw new NotFoundException('Follow relationship not found.');
    }

    await this.prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      },
    });

    return {
      message: 'User unfollowed successfully.',
    };
  }

  async getFollowers(userId: string, page: number, limit: number) {
    await this.usersService.findByIdOrThrow(userId);

    const skip = (page - 1) * limit;

    const [total, followers] = await this.prisma.$transaction([
      this.prisma.follow.count({
        where: {
          followingId: userId,
        },
      }),

      this.prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          follower: {
            include: {
              profile: true,
            },
          },
        },
      }),
    ]);

    return {
      data: followers.map((follow) => UserMapper.toResponse(follow.follower)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getFollowing(userId: string, page: number, limit: number) {
    await this.usersService.findByIdOrThrow(userId);

    const skip = (page - 1) * limit;

    const [total, following] = await this.prisma.$transaction([
      this.prisma.follow.count({
        where: {
          followerId: userId,
        },
      }),

      this.prisma.follow.findMany({
        where: {
          followerId: userId,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          following: {
            include: {
              profile: true,
            },
          },
        },
      }),
    ]);

    return {
      data: following.map((follow) => UserMapper.toResponse(follow.following)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getRelationship(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      return {
        isFollowing: false,
        isSelf: true,
      };
    }

    await this.usersService.findByIdOrThrow(targetUserId);

    const follow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      },
    });

    return {
      isFollowing: !!follow,
      isSelf: false,
    };
  }

async countFollowers(userId: string): Promise<number> {
  return this.prisma.follow.count({
    where: {
      followingId: userId,
    },
  });
}

async countFollowing(userId: string): Promise<number> {
  return this.prisma.follow.count({
    where: {
      followerId: userId,
    },
  });
}


}