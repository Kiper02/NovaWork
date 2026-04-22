export interface ICreateInvitationCommand {
  title: string,
  coverLetter: string,
  senderId: string,
  recipientId: string,
  workspaceId?: string,
  projectId?: string,
}