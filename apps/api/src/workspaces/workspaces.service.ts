import {
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateWorkspaceDto } from './dto/create-workspace.dto';
  
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
  
    async findBySlug(slug: string) {
      const workspace = await this.prisma.workspace.findUnique({
        where: {
          slug,
        },
      });
  
      if (!workspace) {
        throw new NotFoundException('Workspace not found.');
      }
  
      return workspace;
    }
  }