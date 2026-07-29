import { Controller, Get, Param } from '@nestjs/common';

import { DeveloperService } from './developer.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('developers')
export class DeveloperController {
  constructor(
    private readonly developerService: DeveloperService,
  ) {}

  @Public()
  @Get(':username')
  getDeveloperProfile(
    @Param('username') username: string,
  ) {
    return this.developerService.getDeveloperProfile(username);
  }
}