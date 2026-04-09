import { TaskEntity } from '../entities/task.entity';
import { PaginationParamsValueObject } from '../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../value-objects/shared/paginated-result.value-object';
import { TaskFiltersValueObject } from '../value-objects/task/task-filters.value-object';

export abstract class TaskRepository {
  abstract save(entity: TaskEntity): Promise<TaskEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<TaskEntity, 'id'| 'createdAt'>>,
  ): Promise<TaskEntity>;
  public abstract findAll(
    params: TaskFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TaskEntity>>;
  public abstract findById(taskId: string): Promise<TaskEntity | null>;
}