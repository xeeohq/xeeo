import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { WorkspaceVisibility } from '@prisma/client';

import { WorkspacesService } from './workspaces.service';
import { PrismaService } from '../prisma/prisma.service';

describe('WorkspacesService', () => {
  let service: WorkspacesService;

  const prismaMock = {
    workspace: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    workspaceMember: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<WorkspacesService>(WorkspacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a workspace with a generated slug', async () => {
      const createdWorkspace = {
        id: 'workspace-1',
        ownerId: 'user-1',
        name: 'XEEO Development',
        slug: 'xeeo-development',
      };

      prismaMock.workspace.create.mockResolvedValue(createdWorkspace);

      const result = await service.create('user-1', {
        name: '  XEEO Development  ',
        description: 'Development workspace',
      });

      expect(prismaMock.workspace.create).toHaveBeenCalledTimes(1);

      expect(prismaMock.workspace.create).toHaveBeenCalledWith({
        data: {
          ownerId: 'user-1',
          name: 'XEEO Development',
          slug: 'xeeo-development',
          description: 'Development workspace',
          visibility: undefined,
          members: {
            create: {
              userId: 'user-1',
              role: 'OWNER',
              status: 'ACTIVE',
            },
          },
        },
      });

      expect(result).toEqual(createdWorkspace);
    });
  });

  describe('findAllByOwner', () => {
    it('should return only non-deleted workspaces owned by the user', async () => {
      const workspaces = [
        {
          id: 'workspace-1',
          ownerId: 'user-1',
          name: 'XEEO Development',
          slug: 'xeeo-development',
          deletedAt: null,
        },
      ];

      prismaMock.workspace.findMany.mockResolvedValue(workspaces);

      const result = await service.findAllByOwner('user-1');

      expect(prismaMock.workspace.findMany).toHaveBeenCalledWith({
        where: {
          ownerId: 'user-1',
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      expect(result).toEqual(workspaces);
    });
  });

  describe('findBySlug', () => {
    it('should return a private workspace to its owner', async () => {
      const workspace = {
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        visibility: WorkspaceVisibility.PRIVATE,
        deletedAt: null,
      };

      prismaMock.workspace.findFirst.mockResolvedValue(workspace);

      const result = await service.findBySlug(
        'user-1',
        'xeeo-development',
      );

      expect(result).toEqual(workspace);
    });

    it('should allow a non-owner to access a public workspace', async () => {
      const workspace = {
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-public',
        visibility: WorkspaceVisibility.PUBLIC,
        deletedAt: null,
      };

      prismaMock.workspace.findFirst.mockResolvedValue(workspace);

      const result = await service.findBySlug(
        'user-2',
        'xeeo-public',
      );

      expect(result).toEqual(workspace);
    });

    it('should reject a non-owner from accessing a private workspace', async () => {
      const workspace = {
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-private',
        visibility: WorkspaceVisibility.PRIVATE,
        deletedAt: null,
      };

      prismaMock.workspace.findFirst.mockResolvedValue(workspace);

      await expect(
        service.findBySlug('user-2', 'xeeo-private'),
      ).rejects.toThrow(
        'You do not have access to this workspace.',
      );
    });

    it('should throw NotFoundException when the workspace does not exist', async () => {
      prismaMock.workspace.findFirst.mockResolvedValue(null);

      await expect(
        service.findBySlug('user-1', 'does-not-exist'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  
describe('findMembersBySlug', () => {
  const workspace = {
    id: 'workspace-1',
    ownerId: 'user-1',
  };

  it('should return active members to an active member', async () => {
    const members = [
      {
        userId: 'user-1',
        role: 'OWNER',
        status: 'ACTIVE',
        createdAt: new Date(),
        user: {
          id: 'user-1',
          username: 'suraj',
          profile: {
            displayName: 'Suraj',
            avatarUrl: null,
          },
        },
      },
    ];

    prismaMock.workspace.findFirst.mockResolvedValue(workspace);
    prismaMock.workspaceMember.findUnique.mockResolvedValue({
      status: 'ACTIVE',
    });
    prismaMock.workspaceMember.findMany.mockResolvedValue(members);

    const result = await service.findMembersBySlug(
      'user-1',
      'xeeo-development',
    );

    expect(result).toEqual(members);
  });

  it('should reject a user who is not a member', async () => {
    prismaMock.workspace.findFirst.mockResolvedValue(workspace);
    prismaMock.workspaceMember.findUnique.mockResolvedValue(null);

    await expect(
      service.findMembersBySlug('user-2', 'xeeo-development'),
    ).rejects.toThrow(
      'You do not have access to this workspace.',
    );

    expect(prismaMock.workspaceMember.findMany).not.toHaveBeenCalled();
  });

  it('should reject a suspended member', async () => {
    prismaMock.workspace.findFirst.mockResolvedValue(workspace);
    prismaMock.workspaceMember.findUnique.mockResolvedValue({
      status: 'SUSPENDED',
    });

    await expect(
      service.findMembersBySlug('user-1', 'xeeo-development'),
    ).rejects.toThrow(
      'You do not have access to this workspace.',
    );

    expect(prismaMock.workspaceMember.findMany).not.toHaveBeenCalled();
  });

  it('should reject a missing workspace', async () => {
    prismaMock.workspace.findFirst.mockResolvedValue(null);

    await expect(
      service.findMembersBySlug('user-1', 'missing-workspace'),
    ).rejects.toThrow(NotFoundException);

    expect(prismaMock.workspaceMember.findUnique).not.toHaveBeenCalled();
  });
});


  describe('update', () => {
    it('should update a workspace owned by the user', async () => {
      const existingWorkspace = {
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: false,
        deletedAt: null,
      };

      const updatedWorkspace = {
        ...existingWorkspace,
        description: 'Updated description',
      };

      prismaMock.workspace.findUnique.mockResolvedValue(
        existingWorkspace,
      );
      prismaMock.workspace.update.mockResolvedValue(updatedWorkspace);

      const result = await service.update(
        'user-1',
        'xeeo-development',
        {
          description: 'Updated description',
        },
      );

      expect(prismaMock.workspace.update).toHaveBeenCalledWith({
        where: {
          slug: 'xeeo-development',
        },
        data: {
          description: 'Updated description',
        },
      });

      expect(result).toEqual(updatedWorkspace);
    });

    it('should reject an update when the workspace does not exist', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue(null);

      await expect(
        service.update('user-1', 'does-not-exist', {
          description: 'Updated',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject an update by a non-owner', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue({
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: false,
        deletedAt: null,
      });

      await expect(
        service.update('user-2', 'xeeo-development', {
          description: 'Updated',
        }),
      ).rejects.toThrow(
        'You are not the owner of this workspace.',
      );
    });

    it('should reject an update to an archived workspace', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue({
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: true,
        deletedAt: null,
      });

      await expect(
        service.update('user-1', 'xeeo-development', {
          description: 'Updated',
        }),
      ).rejects.toThrow(
        'Archived workspaces cannot be updated.',
      );
    });

    it('should reject an empty update', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue({
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: false,
        deletedAt: null,
      });

      await expect(
        service.update('user-1', 'xeeo-development', {}),
      ).rejects.toThrow(
        'At least one workspace field must be provided.',
      );
    });
  });

  describe('archive', () => {
    it('should archive a workspace owned by the user', async () => {
      const existingWorkspace = {
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: false,
        deletedAt: null,
      };

      const archivedWorkspace = {
        ...existingWorkspace,
        isArchived: true,
      };

      prismaMock.workspace.findUnique.mockResolvedValue(
        existingWorkspace,
      );
      prismaMock.workspace.update.mockResolvedValue(
        archivedWorkspace,
      );

      const result = await service.archive(
        'user-1',
        'xeeo-development',
      );

      expect(prismaMock.workspace.update).toHaveBeenCalledWith({
        where: {
          slug: 'xeeo-development',
        },
        data: {
          isArchived: true,
        },
      });

      expect(result).toEqual(archivedWorkspace);
    });

    it('should reject archiving a workspace that does not exist', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue(null);

      await expect(
        service.archive('user-1', 'does-not-exist'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject archiving by a non-owner', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue({
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: false,
        deletedAt: null,
      });

      await expect(
        service.archive('user-2', 'xeeo-development'),
      ).rejects.toThrow(
        'You are not the owner of this workspace.',
      );
    });

    it('should reject archiving an already archived workspace', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue({
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: true,
        deletedAt: null,
      });

      await expect(
        service.archive('user-1', 'xeeo-development'),
      ).rejects.toThrow(
        'Workspace is already archived.',
      );
    });
  });

  describe('remove', () => {
    it('should soft-delete a workspace owned by the user', async () => {
      const existingWorkspace = {
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: false,
        deletedAt: null,
      };

      const deletedWorkspace = {
        ...existingWorkspace,
        deletedAt: new Date(),
      };

      prismaMock.workspace.findUnique.mockResolvedValue(
        existingWorkspace,
      );
      prismaMock.workspace.update.mockResolvedValue(
        deletedWorkspace,
      );

      const result = await service.remove(
        'user-1',
        'xeeo-development',
      );

      expect(prismaMock.workspace.update).toHaveBeenCalledWith({
        where: {
          slug: 'xeeo-development',
        },
        data: {
          deletedAt: expect.any(Date),
        },
      });

      expect(result).toEqual(deletedWorkspace);
    });

    it('should reject removing a workspace that does not exist', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue(null);

      await expect(
        service.remove('user-1', 'does-not-exist'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject removal by a non-owner', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue({
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: false,
        deletedAt: null,
      });

      await expect(
        service.remove('user-2', 'xeeo-development'),
      ).rejects.toThrow(
        'You are not the owner of this workspace.',
      );
    });

    it('should reject removing an already soft-deleted workspace', async () => {
      prismaMock.workspace.findUnique.mockResolvedValue({
        id: 'workspace-1',
        ownerId: 'user-1',
        slug: 'xeeo-development',
        isArchived: false,
        deletedAt: new Date(),
      });

      await expect(
        service.remove('user-1', 'xeeo-development'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});