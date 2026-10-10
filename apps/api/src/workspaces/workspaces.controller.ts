import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  
  import { CurrentUser } from '../auth/decorators/current-user.decorator';
  import { CreateWorkspaceDto } from './dto/create-workspace.dto';
  import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
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

    @Patch(':slug')
update(
  @CurrentUser() user,
  @Param('slug') slug: string,
  @Body() updateWorkspaceDto: UpdateWorkspaceDto,
) {
  return this.workspacesService.update(
    user.id,
    slug,
    updateWorkspaceDto,
  );
}

@Get(':slug')
findBySlug(
  @CurrentUser() user,
  @Param('slug') slug: string,
) {
  return this.workspacesService.findBySlug(
    user.id,
    slug,
  );
}


  @Get(':slug/members')
  findMembers(
    @CurrentUser() user,
    @Param('slug') slug: string,
  ) {
    return this.workspacesService.findMembersBySlug(
      user.id,
      slug,
    );
  }


@Patch(':slug/archive')
archive(
  @CurrentUser() user,
  @Param('slug') slug: string,
) {
  return this.workspacesService.archive(
    user.id,
    slug,
  );
}

@Delete(':slug')
remove(
  @CurrentUser() user,
  @Param('slug') slug: string,
) {
  return this.workspacesService.remove(
    user.id,
    slug,
  );
}
  }