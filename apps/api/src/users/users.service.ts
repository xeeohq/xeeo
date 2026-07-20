import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma';

type CreateUserData = {
  email: string;
  username: string;
  passwordHash: string;
  displayName: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserData): Promise<User> {
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

      return createdUser;
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}