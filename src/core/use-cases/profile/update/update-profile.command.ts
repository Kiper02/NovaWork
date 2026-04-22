export interface IAvatarDataCommand {
  buffer: Buffer;
  mimetype: string;
}

export interface IUpdateProfileCommand {
  id: string;
  userId: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  avatar?: IAvatarDataCommand;
}