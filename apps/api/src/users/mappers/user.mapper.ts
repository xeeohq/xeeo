import {
  User,
  ExperienceLevel,
  Availability,
} from '@prisma/client';

import {
  UserProfileResponseDto,
  UserResponseDto,
} from '../dto/user-response.dto';

export class UserMapper {
  static toResponse(
    user: User & {
      profile?: {
        displayName: string;
        bio: string | null;
        avatarUrl: string | null;
        bannerUrl: string | null;
        location: string | null;
        website: string | null;
        portfolioUrl: string | null;
        githubUrl: string | null;
        linkedinUrl: string | null;
        twitterUrl: string | null;
        experienceLevel: ExperienceLevel | null;
        availability: Availability | null;
      } | null;
    },
  ): UserResponseDto {
    const profile = new UserProfileResponseDto();

    profile.displayName = user.profile?.displayName ?? '';
    profile.bio = user.profile?.bio ?? null;
    profile.avatarUrl = user.profile?.avatarUrl ?? null;
    profile.bannerUrl = user.profile?.bannerUrl ?? null;
    profile.location = user.profile?.location ?? null;
    profile.website = user.profile?.website ?? null;
    profile.portfolioUrl = user.profile?.portfolioUrl ?? null;
    profile.githubUrl = user.profile?.githubUrl ?? null;
    profile.linkedinUrl = user.profile?.linkedinUrl ?? null;
    profile.twitterUrl = user.profile?.twitterUrl ?? null;
    profile.experienceLevel =
  user.profile?.experienceLevel ?? ExperienceLevel.BEGINNER;
    profile.availability =
  user.profile?.availability ?? Availability.AVAILABLE;

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
