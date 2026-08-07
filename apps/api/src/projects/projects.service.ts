import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectMapper } from './mappers/project.mapper';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus ,
        ProjectVisibility,
        } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
    }
    private async ensureUniqueSlug(baseSlug: string): Promise<string> {
        let slug = baseSlug;
        let counter = 2;

        while (true) {
          const existingProject = await this.prisma.project.findUnique({
            where: {
              slug
            }
          });

          if (!existingProject) {
            return slug;
          }

          slug = `${baseSlug}-${counter}`;
          counter++;
        }
    }
    
    async create(
  ownerId: string,
  createProjectDto: CreateProjectDto,
) {
  const baseSlug = this.generateSlug(createProjectDto.name);

  const slug = await this.ensureUniqueSlug(baseSlug);

  const project = await this.prisma.project.create({
    data: {
      ownerId,
      slug,
      ...createProjectDto,
    },
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
    },
  });

  return ProjectMapper.toResponse(project);
}

async findAll() {
  const projects = await this.prisma.project.findMany({
    where: {
      status: 'ACTIVE',
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
    },
  });

  return projects.map(ProjectMapper.toResponse);
}

async findBySlug(slug: string) {
  const project = await this.prisma.project.findUnique({
    where: { slug },
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  return ProjectMapper.toResponse(project);
}
async update(
  userId: string,
  slug: string,
  updateProjectDto: UpdateProjectDto,
) {
  const existingProject = await this.prisma.project.findUnique({
    where: { slug },
  });

  if (!existingProject) {
    throw new NotFoundException('Project not found');
  }

  if (existingProject.ownerId !== userId) {
    throw new ForbiddenException(
      'You are not the owner of this project',
    );
  }

  const updatedProject = await this.prisma.project.update({
    where: { slug },
    data: updateProjectDto,
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
    },
  });

  return ProjectMapper.toResponse(updatedProject);
}

async findPublicProjects() {
  const projects = await this.prisma.project.findMany({
    where: {
      status: ProjectStatus.ACTIVE,
      visibility: ProjectVisibility.PUBLIC,
    },
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return projects.map(ProjectMapper.toResponse);
}

async remove(
  userId: string,
  slug: string,
) {
  const project = await this.prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  if (project.ownerId !== userId) {
    throw new ForbiddenException(
      'You are not the owner of this project',
    );
  }

  await this.prisma.project.update({
    where: { slug },
    data: {
      status: ProjectStatus.ARCHIVED,
    },
  });

  return {
    message: 'Project archived successfully',
  };
}

}
