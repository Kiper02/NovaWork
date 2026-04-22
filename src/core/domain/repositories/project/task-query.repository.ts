import { TaskFiltersValueObject } from '../../value-objects/task/task-filters.value-object';
import { TaskAggregate } from '../../aggregates/task.aggregate';
import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';

export abstract class TaskQueryRepository {
  public abstract findAllForDetails(
    params: TaskFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TaskAggregate>>;

  public abstract findByIdForDetails(
    taskId: string,
  ): Promise<TaskAggregate | null>;
}