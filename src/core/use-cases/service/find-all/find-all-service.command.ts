export interface IFindAllServiceCommand {
  userId?: string;
  title?: string;
  description?: string;
  isPublished?: boolean;
  minPrice?: number;
  maxPrice?: number;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  page: number;
  limit: number;
}
