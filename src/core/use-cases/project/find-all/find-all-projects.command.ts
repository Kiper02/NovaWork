export interface IFindAllProjectsCommand {
  userId?: string,
  createdAtStart?: Date,
  createdAtEnd?: Date,
  page: number;
  limit: number;
}