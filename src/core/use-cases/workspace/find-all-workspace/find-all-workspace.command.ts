export interface IFindAllWorkspaceCommand {
  page: number;
  limit: number;
  name?: string;
  userId?: string;
}
