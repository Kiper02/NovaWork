export class InvitationEntity {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly coverLetter: string,
    public readonly senderId: string,
    public readonly recipientId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly workspaceId: string | null,
    public readonly projectId: string | null,
  ) {}
}
