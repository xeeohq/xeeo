export class DeveloperProfileDto {
  displayName!: string;

  bio!: string | null;

  avatarUrl!: string | null;

  bannerUrl!: string | null;

  location!: string | null;

  website!: string | null;

  portfolioUrl!: string | null;

  githubUrl!: string | null;

  linkedinUrl!: string | null;

  twitterUrl!: string | null;

  experienceLevel!: string;

  availability!: string;
}

export class DeveloperStatsDto {
  followers!: number;

  following!: number;

  projects!: number;

  repositories!: number;

  workspaces!: number;
}

export class DeveloperProfileResponseDto {
  id!: string;

  username!: string;

  profile!: DeveloperProfileDto;

  stats!: DeveloperStatsDto;

  skills!: unknown[];
}