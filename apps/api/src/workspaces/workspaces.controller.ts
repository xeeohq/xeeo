import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  import { CurrentUser } from '../auth/decorators/current-user.decorator';
  import { CreateWorkspaceDto } from './dto/create-workspace.dto';
  import { WorkspacesService } from './workspaces.service';
  
  @Controller('workspaces')
  export class WorkspacesController {
    constructor(
      private readonly workspacesService: WorkspacesService,
    ) {}
    @Post()
    create(
      @CurrentUser() user,
      @Body() createWorkspaceDto: CreateWorkspaceDto,
    ) {
      return this.workspacesService.create(
        user.id,
        createWorkspaceDto,
      );
    }
    
    @Get()
    findAll(@CurrentUser() user) {
      return this.workspacesService.findAllByOwner(user.id);
    }

    @Get(':slug')
findBySlug(@Param('slug') slug: string) {
  return this.workspacesService.findBySlug(slug);
}
  }