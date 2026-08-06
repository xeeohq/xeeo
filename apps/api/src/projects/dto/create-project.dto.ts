import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';

import { ProjectVisibility } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100, {
  message: 'Project name must be between 3 and 100 characters.',
})
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, {
  message: 'Project description must be at most 500 characters.',
})
  description?: string;

  @IsOptional()
  @IsEnum(ProjectVisibility, {
  message: 'Invalid project visibility.',
})
  visibility?: ProjectVisibility;

  @IsOptional()
  @IsUrl({ require_protocol: true }, {
  message: 'Invalid repository URL.',
})
  repositoryUrl?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true }, {
  message: 'Invalid live URL.',
})
  liveUrl?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true }, {
  message: 'Invalid documentation URL.',
})
  documentationUrl?: string;

  @IsOptional()
  @IsString({
  message: 'README content must be a string.',
})
  readme?: string;

  @IsOptional()
  @IsString({
  message: 'License name must be a string.',
})
  @MaxLength(50, {
  message: 'License must be at most 50 characters.',
})
  license?: string;
}