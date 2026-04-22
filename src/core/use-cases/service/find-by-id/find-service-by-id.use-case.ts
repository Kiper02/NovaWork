import { Injectable } from '@nestjs/common';
import { IFindServiceByIdCommand } from './find-service-by-id.command';
import { ServiceNotFoundException } from '../../../domain/exceptions/service/service-not-found.exception';
import { ServiceQueryRepository } from '../../../domain/repositories/project/service-query.repository';

@Injectable()
export class FindServiceByIdUseCase {
  public constructor(
    private readonly serviceQueryRepository: ServiceQueryRepository,
  ) {}

  public async execute(command: IFindServiceByIdCommand) {
    const service = await this.serviceQueryRepository.findByIdForDetails(
      command.serviceId,
    );
    if (!service) {
      throw new ServiceNotFoundException();
    }

    return service;
  }
}