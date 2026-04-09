import { EnumTaskStatus } from '../../entities/task.entity';

export class TaskFiltersValueObject {
  constructor(
    public readonly userId?: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly isPublished?: boolean,
    public readonly minPrice?: number,
    public readonly maxPrice?: number,
    public readonly notBids?: boolean,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
    public readonly status?: EnumTaskStatus
  ) {}
}
