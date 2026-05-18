export interface IAvatarDataCommand {
  buffer: Buffer;
  mimetype: string;
}

export interface IUpdateProfileSettingsCommand {
  emailEnabled?: boolean;
  pushEnabled?: boolean;
}

export interface IUpdateProfileCommand {
  id: string;
  userId: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  avatar?: IAvatarDataCommand;
  about?: string;
  role?: string;
}
