import {
    Injectable,
    NotFoundException,
    ForbiddenException,
BadRequestException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateWorkspaceDto } from './dto/create-workspace.dto';
  import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
  
  @Injectable()
  export class WorkspacesService {
    constructor(
      private readonly prisma: PrismaService,
    ) {}
  
    async create(
      userId: string,
      createWorkspaceDto: CreateWorkspaceDto,
    ) {
      const slug = createWorkspaceDto.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
  
      return this.prisma.workspace.create({
        data: {
          ownerId: userId,
          name: createWorkspaceDto.name.trim(),
          slug,
          description: createWorkspaceDto.description,
          visibility: createWorkspaceDto.visibility,
        },
      });
    }

    async findAllByOwner(userId: string) {
        return this.prisma.workspace.findMany({
          where: {
            ownerId: userId,
            deletedAt: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      }
  
      async findBySlug(
        userId: string,
        slug: string,
      ) {
        const workspace = await this.prisma.workspace.findFirst({
          where: {
            slug,
            deletedAt: null,
          },
        });
      
        if (!workspace) {
          throw new NotFoundException('Workspace not found.');
        }
      
        if (
          workspace.visibility === 'PRIVATE' &&
          workspace.ownerId !== userId
        ) {
          throw new ForbiddenException(
            'You do not have access to this workspace.',
          );
        }
      
        return workspace;
      }

    async update(
        userId: string,
        slug: string,
        updateWorkspaceDto: UpdateWorkspaceDto,
      ) {
        const existingWorkspace = await this.prisma.workspace.findUnique({
          where: { slug },
        });
      
        if (!existingWorkspace || existingWorkspace.deletedAt) {
          throw new NotFoundException('Workspace not found.');
        }
      
        if (existingWorkspace.ownerId !== userId) {
          throw new ForbiddenException(
            'You are not the owner of this workspace.',
          );
        }
      
        if (existingWorkspace.isArchived) {
          throw new BadRequestException(
            'Archived workspaces cannot be updated.',
          );
        }
      
        if (Object.keys(updateWorkspaceDto).length === 0) {
          throw new BadRequestException(
            'At least one workspace field must be provided.',
          );
        }
      
        return this.prisma.workspace.update({
          where: { slug },
          data: updateWorkspaceDto,
        });
      }

      async archive(
        userId: string,
        slug: string,
      ) {
        const existingWorkspace = await this.prisma.workspace.findUnique({
          where: { slug },
        });
      
        if (!existingWorkspace || existingWorkspace.deletedAt) {
          throw new NotFoundException('Workspace not found.');
        }
      
        if (existingWorkspace.ownerId !== userId) {
          throw new ForbiddenException(
            'You are not the owner of this workspace.',
          );
        }
      
        if (existingWorkspace.isArchived) {
          throw new BadRequestException(
            'Workspace is already archived.',
          );
        }
      
        return this.prisma.workspace.update({
          where: { slug },
          data: {
            isArchived: true,
          },
        });
      }

      async remove(
        userId: string,
        slug: string,
      ) {
        const existingWorkspace = await this.prisma.workspace.findUnique({
          where: { slug },
        });
      
        if (!existingWorkspace || existingWorkspace.deletedAt) {
          throw new NotFoundException('Workspace not found.');
        }
      
        if (existingWorkspace.ownerId !== userId) {
          throw new ForbiddenException(
            'You are not the owner of this workspace.',
          );
        }
      
        return this.prisma.workspace.update({
          where: { slug },
          data: {
            deletedAt: new Date(),
          },
        });
      }
  }