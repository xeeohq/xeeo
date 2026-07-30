import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { userWithProfileInclude } from './constants/user.include';
import { UpdateAccountDto } from './dto/update-account.dto';

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
      updateProfileDto.avatarUrl !== undefined ||
      updateProfileDto.bannerUrl !== undefined ||
      updateProfileDto.location !== undefined ||
      updateProfileDto.website !== undefined ||
      updateProfileDto.portfolioUrl !== undefined ||
      updateProfileDto.githubUrl !== undefined ||
      updateProfileDto.linkedinUrl !== undefined ||
      updateProfileDto.twitterUrl !== undefined ||
      updateProfileDto.experienceLevel !== undefined ||
      updateProfileDto.availability !== undefined;

    if (!hasUpdates) {
      throw new BadRequestException('At least one field must be provided.');
    }

    await this.findByIdOrThrow(userId);

    const {
      displayName,
      bio,
      avatarUrl,
      bannerUrl,
      location,
      website,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
      twitterUrl,
      experienceLevel,
      availability,
    } = updateProfileDto;

    await this.prisma.profile.update({
      where: {
        userId,
      },
      data: {
        displayName,
        bio,
        avatarUrl,
        bannerUrl,
        location,
        website,
        portfolioUrl,
        githubUrl,
        linkedinUrl,
        twitterUrl,
        experienceLevel,
        availability,
      },
    });

    return this.findByIdOrThrow(userId);
  }
  async updateAccount(
  userId: string,
  updateAccountDto: UpdateAccountDto,
) {
  const hasUpdates =
    updateAccountDto.username !== undefined ||
    updateAccountDto.email !== undefined;

  if (!hasUpdates) {
    throw new BadRequestException(
      'At least one field must be provided.',
    );
  }

  const user = await this.findByIdOrThrow(userId);

  const { username, email } = updateAccountDto;

  if (username !== undefined && username !== user.username) {
    const existingUser = await this.findByUsername(username);

    if (existingUser) {
      throw new BadRequestException(
        'Username is already taken.',
      );
    }
  }

  if (email !== undefined && email !== user.email) {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException(
        'Email is already registered.',
      );
    }
  }

  await this.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
      email,
    },
  });

  return this.findByIdOrThrow(userId);
}
}
