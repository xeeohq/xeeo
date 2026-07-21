import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma';
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
}