import { Project, Profile, User } from '@prisma/client';

type ProjectWithOwner = Project & {
  owner: User & {
    profile: Profile | null;
  };
};

export class ProjectMapper {
  static toResponse(project: ProjectWithOwner) {
    return {
      id: project.id,

      name: project.name,
      slug: project.slug,
      description: project.description,

      visibility: project.visibility,
      status: project.status,

      repositoryUrl: project.repositoryUrl,
      liveUrl: project.liveUrl,
      documentationUrl: project.documentationUrl,

      readme: project.readme,
      license: project.license,

      createdAt: project.createdAt,
      updatedAt: project.updatedAt,

      owner: {
        id: project.owner.id,
        username: project.owner.username,
        displayName: project.owner.profile?.displayName ?? null,
        avatarUrl: project.owner.profile?.avatarUrl ?? null,
      },
    };
  }
}