export class UserProfileResponseDto {
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

export class UserResponseDto {
  id!: string;

  username!: string;

  email!: string;

  role!: string;

  status!: string;

  emailVerified!: boolean;

  createdAt!: Date;

  profile!: UserProfileResponseDto;
}
