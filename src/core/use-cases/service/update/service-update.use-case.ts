import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../../../domain/repositories/project/service.repository';
import { IServiceUpdateCommand } from './service-update.command';
import { ServiceNotFoundException } from '../../../domain/exceptions/service/service-not-found.exception';
import { AccessControlService } from '../../../domain/services/authorization/access-control.service';
import { UpdateServiceException } from '../../../domain/exceptions/service/update-service.exception';


@Injectable()
export class ServiceUpdateUseCase {
  public constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly accessControlService: AccessControlService,
  ) {}

  public async execute(command: IServiceUpdateCommand) {
    const service = await this.serviceRepository.findById(command.id);
    if (!service) {
      throw new ServiceNotFoundException();
    }

    await this.accessControlService.checkAccessOrThrow(
      command.userId,
      ['super_admin', 'admin', 'moderator'],
      service.userId,
      new ServiceNotFoundException(),
    );

    const serviceUpdate = await this.serviceRepository.update(command.id, command);

    if (!serviceUpdate) {
      throw new UpdateServiceException();
    }

    return serviceUpdate;
  }
}