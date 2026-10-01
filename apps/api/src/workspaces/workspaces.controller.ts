import { Body, Controller, Post } from '@nestjs/common';
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
}