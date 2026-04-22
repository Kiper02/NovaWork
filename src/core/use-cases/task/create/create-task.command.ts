import { EnumTaskStatus } from '../../../domain/entities/project/task.entity';

export interface ICreateTaskCommand {
  title: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  status?: EnumTaskStatus;
  isPublished?: boolean;
  userId: string;
  projectId?: string;
  workspaceId?: string;
  categoryIds?: string[];
}
