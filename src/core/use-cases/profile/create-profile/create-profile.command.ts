export interface ICreateProfileCommand {
  firstName: string;
  middleName: string;
  lastName: string;
  userId: string;
  about?: string;
  role?: string;
}
