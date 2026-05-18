import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { TaskViewEntity } from '../../entities/project/task-view.entity';
import { TaskViewFiltersValueObject } from '../../value-objects/task-view/task-view-filters.value-object';

export abstract class TaskViewRepository {
  public abstract save(entity: TaskViewEntity): Promise<TaskViewEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<TaskViewEntity, 'id' | 'createdAt'>>,
  ): Promise<TaskViewEntity>;
  public abstract findAll(
    params: TaskViewFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TaskViewEntity>>;
  public abstract findById(id: string): Promise<TaskViewEntity | null>;
  public abstract findByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<TaskViewEntity | null>;
  public abstract countByTaskId(taskId: string): Promise<number>;
}
