import { IsEnum, IsString } from 'class-validator';
import { ProjectMemberRole } from '@prisma/client';

export class AddProjectMemberDto {
  @IsString()
  userId!: string;

  @IsEnum(ProjectMemberRole)
  role: ProjectMemberRole = ProjectMemberRole.MEMBER;
}