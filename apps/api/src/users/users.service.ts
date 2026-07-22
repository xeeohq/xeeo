import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { userWithProfileInclude } from './constants/user.include';

type CreateUserData = {
  email: string;
  username: string;
  passwordHash: string;
  displayName: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserData) {
    const { displayName, ...userData } = data;

    const user = await this.prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: userData,
      });

      await tx.profile.create({
        data: {
          userId: createdUser.id,
          displayName,
        },
      });

      return tx.user.findUniqueOrThrow({
        where: {
          id: createdUser.id,
        },
        include: userWithProfileInclude,
      });
    });

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: userWithProfileInclude,
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
      include: userWithProfileInclude,
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: userWithProfileInclude,
    });
  }

  async findByIdOrThrow(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const hasUpdates =
      updateProfileDto.displayName !== undefined ||
      updateProfileDto.bio !== undefined ||
      updateProfileDto.avatarUrl !== undefined;

    if (!hasUpdates) {
      throw new BadRequestException('At least one field must be provided.');
    }

    await this.findByIdOrThrow(userId);

    const { displayName, bio, avatarUrl } = updateProfileDto;

    await this.prisma.profile.update({
      where: {
        userId,
      },
      data: {
        displayName,
        bio,
        avatarUrl,
      },
    });

    return this.findByIdOrThrow(userId);
  }
}
