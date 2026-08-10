import { Body, Controller, Post, Get, Param, Delete, Patch } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Public } from '../auth/decorators/public.decorator';
import { AddProjectMemberDto } from './dto/add-project-member.dto';
import { UpdateProjectMemberDto } from './dto/update-project-member.dto';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
    ) {}

    @Post()
    create(
        @CurrentUser() user,
        @Body() createProjectDto: CreateProjectDto,
    ) {
        return this.projectsService.create(
            user.id,
            createProjectDto,
        );
    }
    @Get()
findAll() {
  return this.projectsService.findAll();
}

@Patch(':slug')
update(
  @CurrentUser() user,
  @Param('slug') slug: string,
  @Body() updateProjectDto: UpdateProjectDto,
) {
  return this.projectsService.update(
    user.id,
    slug,
    updateProjectDto,
  );
}

@Public()
@Get('public')
findPublicProjects() {
  return this.projectsService.findPublicProjects();
}

    @Get(':slug')
findBySlug(
  @Param('slug') slug: string,
) {
  return this.projectsService.findBySlug(slug);
}

@Delete(':slug')
remove(
  @CurrentUser() user,
  @Param('slug') slug: string,
) {
  return this.projectsService.remove(
    user.id,
    slug,
  );
}

@Post(':slug/star')
starProject(
  @CurrentUser() user: any,
  @Param('slug') slug: string,
) {
  return this.projectsService.starProject(
    user.id,
    slug,
  );
}

@Delete(':slug/star')
unstarProject(
  @CurrentUser() user: any,
  @Param('slug') slug: string,
) {
  return this.projectsService.unstarProject(
    user.id,
    slug,
  );
}

@Get(':slug/members')
getMembers(
  @Param('slug') slug: string,
) {
  return this.projectsService.getMembers(slug);
}

@Post(':slug/members')
addMember(
  @CurrentUser() user: any,
  @Param('slug') slug: string,
  @Body() addProjectMemberDto: AddProjectMemberDto,
) {
  return this.projectsService.addMember(
    user.id,
    slug,
    addProjectMemberDto,
  );
}

@Patch(':slug/members/:userId')
updateMemberRole(
  @CurrentUser() user: any,
  @Param('slug') slug: string,
  @Param('userId') userId: string,
  @Body() updateProjectMemberDto: UpdateProjectMemberDto,
) {
  return this.projectsService.updateMemberRole(
    user.id,
    slug,
    userId,
    updateProjectMemberDto,
  );
}

@Delete(':slug/members/:userId')
removeMember(
  @CurrentUser() user: any,
  @Param('slug') slug: string,
  @Param('userId') userId: string,
) {
  return this.projectsService.removeMember(
    user.id,
    slug,
    userId,
  );
}

}