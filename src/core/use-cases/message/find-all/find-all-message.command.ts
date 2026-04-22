export interface IFindAllMessageCommand {
  senderId?: string,
  userId: string;
  chatId: string,
  text?: string,
  createdAtStart?: Date,
  createdAtEnd?: Date,
  page: number;
  limit: number;
}