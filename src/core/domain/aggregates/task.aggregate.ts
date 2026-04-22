import { TaskEntity } from '../entities/project/task.entity';
import { CategoryEntity } from '../entities/shared/category.entity';
import { UserAggregate } from './user.aggregate';

export class TaskAggregate {
  constructor(
    public readonly task: TaskEntity,
    public readonly categories: CategoryEntity[],
    public readonly creator: UserAggregate
  ) {}
}
