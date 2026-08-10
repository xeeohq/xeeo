import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectMapper } from './mappers/project.mapper';
import {
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  ConflictException
} from '@nestjs/common';

import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus ,
        ProjectVisibility,
        ProjectMemberRole,
        } from '@prisma/client';
import { AddProjectMemberDto } from './dto/add-project-member.dto';
import { UpdateProjectMemberDto } from './dto/update-project-member.dto';


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

async getMembers(slug: string) {
  const project = await this.prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  const members = await this.prisma.projectMember.findMany({
  where: {
    projectId: project.id,
  },
  select: {
    projectId: true,
    userId: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    user: {
      select: {
        id: true,
        username: true,
        email: true,
        profile: true,
      },
    },
  },
  orderBy: {
    createdAt: 'asc',
  },
});

return members;
}

async addMember(
  ownerId: string,
  slug: string,
  dto: AddProjectMemberDto,
) {
  const project = await this.prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  if (project.ownerId !== ownerId) {
    throw new ForbiddenException(
      'You are not the owner of this project',
    );
  }

  if (project.status !== ProjectStatus.ACTIVE) {
    throw new BadRequestException(
      'Archived projects cannot have members added',
    );
  }

  if (dto.userId === ownerId) {
    throw new BadRequestException(
      'Project owner does not need to be added as a member',
    );
  }

  const user = await this.prisma.user.findUnique({
    where: {
      id: dto.userId,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const existingMember =
    await this.prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId: project.id,
          userId: dto.userId,
        },
      },
    });

  if (existingMember) {
    throw new ConflictException(
      'User is already a member of this project',
    );
  }

  return this.prisma.projectMember.create({
  data: {
    projectId: project.id,
    userId: dto.userId,
    role: dto.role,
  },
  select: {
    projectId: true,
    userId: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    user: {
      select: {
        id: true,
        username: true,
        email: true,
        profile: true,
      },
    },
  },
});
}

async updateMemberRole(
  ownerId: string,
  slug: string,
  userId: string,
  dto: UpdateProjectMemberDto,
) {
  const project = await this.prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  if (project.ownerId !== ownerId) {
    throw new ForbiddenException(
      'You are not the owner of this project',
    );
  }

  const member = await this.prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId,
      },
    },
  });

  if (!member) {
    throw new NotFoundException(
      'Project member not found',
    );
  }

  return this.prisma.projectMember.update({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId,
      },
    },
    data: {
      role: dto.role,
    },
    select: {
  projectId: true,
  userId: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      username: true,
      email: true,
      profile: true,
    },
  },
},
});
}

async removeMember(
  ownerId: string,
  slug: string,
  userId: string,
) {
  const project = await this.prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  if (project.ownerId !== ownerId) {
    throw new ForbiddenException(
      'You are not the owner of this project',
    );
  }

  const member = await this.prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId,
      },
    },
  });

  if (!member) {
    throw new NotFoundException(
      'Project member not found',
    );
  }

  await this.prisma.projectMember.delete({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId,
      },
    },
  });

  return {
    message: 'Project member removed successfully',
  };
}

async starProject(
  userId: string,
  slug: string,
) {
  const project = await this.prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  if (project.status !== ProjectStatus.ACTIVE) {
    throw new BadRequestException(
      'Archived projects cannot be starred',
    );
  }

  const existingStar = await this.prisma.projectStar.findUnique({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId,
      },
    },
  });

  if (existingStar) {
    throw new ConflictException(
      'You have already starred this project',
    );
  }

  await this.prisma.projectStar.create({
    data: {
      projectId: project.id,
      userId,
    },
  });

  return {
    message: 'Project starred successfully',
  };
}

async unstarProject(
  userId: string,
  slug: string,
) {
  const project = await this.prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  const existingStar = await this.prisma.projectStar.findUnique({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId,
      },
    },
  });

  if (!existingStar) {
    throw new NotFoundException(
      'You have not starred this project',
    );
  }

  await this.prisma.projectStar.delete({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId,
      },
    },
  });

  return {
    message: 'Project unstarred successfully',
  };
}

}
