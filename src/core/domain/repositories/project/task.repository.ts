import { TaskEntity } from '../../entities/project/task.entity';
import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { TaskFiltersValueObject } from '../../value-objects/task/task-filters.value-object';
import { TaskAggregate } from '../../aggregates/task.aggregate';

export abstract class TaskRepository {
  abstract save(entity: TaskEntity): Promise<TaskEntity | null>;
  public abstract update(
    id: string,
    data: Partial<Omit<TaskEntity, 'id' | 'createdAt'>>,
  ): Promise<TaskEntity | null>;
  public abstract findAll(
    params: TaskFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TaskEntity>>;
  public abstract findById(taskId: string): Promise<TaskEntity | null>;
}