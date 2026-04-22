import { Injectable } from '@nestjs/common';
import { IFindAllServiceCommand } from './find-all-service.command';
import { ServiceFiltersValueObject } from '../../../domain/value-objects/service/service-filters.value-object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { ServiceQueryRepository } from '../../../domain/repositories/project/service-query.repository';

@Injectable()
export class FindAllServiceUseCase {
  public constructor(
    private readonly serviceQueryRepository: ServiceQueryRepository,
  ) {}

  public async execute(command: IFindAllServiceCommand) {
    const params = new ServiceFiltersValueObject(
      command.title,
      command.description,
      command.isPublished,
      command.userId,
      command.minPrice,
      command.maxPrice,
      command.createdAtStart,
      command.createdAtEnd,
    );

    const pagination = new PaginationParamsValueObject(
      command.page,
      command.limit,
    );

    return this.serviceQueryRepository.findAllForDetails(params, pagination);
  }
}