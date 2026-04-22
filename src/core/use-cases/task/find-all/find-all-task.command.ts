import { EnumTaskStatus } from '../../../domain/entities/project/task.entity';

export interface IFindAllTaskCommand {
  userId?: string;
  title?: string;
  description?: string;
  isPublished?: boolean;
  minPrice?: number;
  maxPrice?: number;
  notBids?: boolean;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  status?: EnumTaskStatus;
  page: number;
  limit: number;
}
