import {
  DeveloperProfileDto,
  DeveloperProfileResponseDto,
  DeveloperStatsDto,
} from '../dto/developer-profile-response.dto';

export class DeveloperMapper {
  static toResponse(data: {
    user: {
      id: string;
      username: string;
      profile: {
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
        experienceLevel: string;
        availability: string;
      } | null;
    };

    followers: number;

    following: number;

    skills: unknown[];
  }): DeveloperProfileResponseDto {
    const profile = new DeveloperProfileDto();

    profile.displayName = data.user.profile?.displayName ?? '';
    profile.bio = data.user.profile?.bio ?? null;
    profile.avatarUrl = data.user.profile?.avatarUrl ?? null;
    profile.bannerUrl = data.user.profile?.bannerUrl ?? null;
    profile.location = data.user.profile?.location ?? null;
    profile.website = data.user.profile?.website ?? null;
    profile.portfolioUrl = data.user.profile?.portfolioUrl ?? null;
    profile.githubUrl = data.user.profile?.githubUrl ?? null;
    profile.linkedinUrl = data.user.profile?.linkedinUrl ?? null;
    profile.twitterUrl = data.user.profile?.twitterUrl ?? null;
    profile.experienceLevel =
      data.user.profile?.experienceLevel ?? 'BEGINNER';
    profile.availability =
      data.user.profile?.availability ?? 'AVAILABLE';

    const stats = new DeveloperStatsDto();

    stats.followers = data.followers;
    stats.following = data.following;
    stats.projects = 0;
    stats.repositories = 0;
    stats.workspaces = 0;

    const response = new DeveloperProfileResponseDto();

    response.id = data.user.id;
    response.username = data.user.username;
    response.profile = profile;
    response.stats = stats;
    response.skills = data.skills;

    return response;
  }
}