export interface IUpdateInvitationCommand {
  id: string
  title?: string,
  amount?: number;
  coverLetter?: string,
  userId: string;
}