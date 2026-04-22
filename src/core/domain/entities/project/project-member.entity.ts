export class ProjectMemberEntity {
  constructor(
    public readonly id: string,
    public readonly projectId: string,
    public readonly userId: string,
    public readonly roleId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}