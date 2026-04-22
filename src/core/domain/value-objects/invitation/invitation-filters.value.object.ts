export class InvitationFiltersValueObject {
  constructor(
    public readonly senderId?: string,
    public readonly recipientId?: string,
    public readonly workspaceId?: string,
    public readonly projectId?: string,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date
  ) {}
}
