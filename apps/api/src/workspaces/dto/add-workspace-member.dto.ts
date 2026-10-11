
import { IsEnum, IsString } from 'class-validator';
import { WorkspaceMemberRole } from '@prisma/client';

export class AddWorkspaceMemberDto {
  @IsString()
  userId!: string;

  @IsEnum(WorkspaceMemberRole)
  role: WorkspaceMemberRole = WorkspaceMemberRole.MEMBER;
}
