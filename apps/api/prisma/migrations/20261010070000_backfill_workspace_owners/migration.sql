-- Backfill owner memberships for workspaces that already exist.
-- The composite primary key makes the operation safe to rerun.
INSERT INTO "WorkspaceMember" (
    "workspaceId",
    "userId",
    "role",
    "status",
    "createdAt",
    "updatedAt"
)
SELECT
    w."id",
    w."ownerId",
    'OWNER'::"WorkspaceMemberRole",
    'ACTIVE'::"WorkspaceMemberStatus",
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Workspace" AS w
WHERE NOT EXISTS (
    SELECT 1
    FROM "WorkspaceMember" AS wm
    WHERE wm."workspaceId" = w."id"
      AND wm."userId" = w."ownerId"
);
