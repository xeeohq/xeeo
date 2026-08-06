import { Body, Controller, Post } from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { Get, Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Delete } from '@nestjs/common';

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

}