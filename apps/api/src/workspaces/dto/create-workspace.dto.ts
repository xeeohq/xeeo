import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    MaxLength,
  } from 'class-validator';
  
  import { WorkspaceVisibility } from '@prisma/client';
  
  export class CreateWorkspaceDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 60, {
      message: 'Workspace name must be between 3 and 60 characters.',
    })
    name!: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(1000, {
      message: 'Workspace description must be at most 1000 characters.',
    })
    description?: string;
  
    @IsOptional()
    @IsEnum(WorkspaceVisibility, {
      message: 'Invalid workspace visibility.',
    })
    visibility?: WorkspaceVisibility;
  }