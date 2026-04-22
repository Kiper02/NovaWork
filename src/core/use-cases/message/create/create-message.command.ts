export interface IFileAttachment {
  buffer: Buffer;
  mimeType: string;
}

export interface ICreateMessageCommand {
  readonly text?: string;
  readonly files?: IFileAttachment[];
  readonly chatId: string;
  readonly senderId: string;
}
