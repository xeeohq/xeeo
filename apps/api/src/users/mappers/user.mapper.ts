
import { User } from '@prisma/client';

import {
  UserProfileResponseDto,
  UserResponseDto,
} from '../dto/user-response.dto';

export class UserMapper {
  static toResponse(
    user: User & {
      profile?: {
        displayName: string;
      } | null;
    },
  ): UserResponseDto {
    const profile = new UserProfileResponseDto();

    profile.displayName =
      user.profile?.displayName ?? '';

    const response = new UserResponseDto();

    response.id = user.id;
    response.username = user.username;
    response.email = user.email;
    response.role = user.role;
    response.status = user.status;
    response.emailVerified = user.emailVerified;
    response.createdAt = user.createdAt;
    response.profile = profile;

    return response;
  }
}