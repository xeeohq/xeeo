export class UserProfileResponseDto {
  displayName!: string;

  bio!: string | null;

  avatarUrl!: string | null;
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
