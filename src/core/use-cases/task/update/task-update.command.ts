import { EnumTaskStatus } from '../../../domain/entities/task.entity';

export interface ITaskUpdateCommand {
  id: string;
  title?: string;
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: EnumTaskStatus;
  isPublished?: boolean;
  userId: string;
}
