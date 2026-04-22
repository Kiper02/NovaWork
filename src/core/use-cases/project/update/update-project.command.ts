export interface IUpdateProjectCommand {
  id: string,
  userId: string;
  title?: string,
  picture?: Buffer,
}