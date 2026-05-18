export interface IFindAllTaskViewCommand {
  page: number;
  limit: number;
  userId?: string;
  taskId?: string;
}
