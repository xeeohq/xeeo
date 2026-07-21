import { Prisma } from '@prisma/client';

export const userWithProfileInclude =
  Prisma.validator<Prisma.UserInclude>()({
    profile: true,
  });