import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../../../domain/repositories/project/service.repository';
import { WorkspaceRepository } from '../../../domain/repositories/project/workspace.repository';
import { ICreateServiceCommand } from './create-service.command';
import { ServiceEntity } from '../../../domain/entities/project/service.entity';
import {v4 as uuid} from 'uuid';
import {
  DefaultWorkspaceNotFoundException
} from '../../../domain/exceptions/workspace/default-workspace-not-found.exception';
import { WorkspaceNotFoundException } from '../../../domain/exceptions/workspace/workspace-not-found.exception';
import { CreateServiceException } from '../../../domain/exceptions/service/create-service.exception';

@Injectable()
export class CreateServiceUseCase {
  public constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  public async execute(command: ICreateServiceCommand) {
    let workspaceId: string | null = command.workspaceId ?? null;

    if (!command.workspaceId) {
      const defaultWorkspace =
        await this.workspaceRepository.findDefaultUserWorkspace(command.userId);
      if(!defaultWorkspace) {
        throw new DefaultWorkspaceNotFoundException()
      }
      workspaceId = defaultWorkspace.id;
    } else {
      const workspace = await this.workspaceRepository.findById(command.workspaceId);
      if(!workspace) {
        throw new WorkspaceNotFoundException()
      }
      workspaceId = workspace.id
    }

    const serviceEntity = new ServiceEntity(
      uuid(),
      command.title,
      command.description,
      command.price,
      command.isPublished,
      command.userId,
      workspaceId,
      command.categoryIds ?? [],
      new Date(),
      new Date()
    )

    const service = await this.serviceRepository.save(serviceEntity)

    if(!service) {
      throw new CreateServiceException()
    }

    return service;
  }
}