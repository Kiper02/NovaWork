import { ServiceEntity } from '../entities/project/service.entity';
import { CategoryEntity } from '../entities/shared/category.entity';
import { UserAggregate } from './user.aggregate';

export class ServiceAggregate {
  constructor(
    public readonly service: ServiceEntity,
    public readonly categories: CategoryEntity[],
    public readonly creator: UserAggregate,
  ) {}
}
