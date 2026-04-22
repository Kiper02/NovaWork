export interface IFindAllInvitationCommand {
  createdAtStart?: Date,
  createdAtEnd?: Date
  projectId?: string;
  workspaceId?: string;
  senderId?: string;
  recipientId?: string;
  userId: string;
  page: number;
  limit: number;
}