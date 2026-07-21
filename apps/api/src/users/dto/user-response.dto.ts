export class UserProfileResponseDto {
  displayName!: string;
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