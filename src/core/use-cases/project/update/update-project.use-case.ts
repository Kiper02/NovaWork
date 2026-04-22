import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/repositories/project/project.repository';
import { IUpdateProjectCommand } from './update-project.command';
import { ProjectNotFoundException } from '../../../domain/exceptions/project/project-not-found.exception';
import { AccessControlService } from '../../../domain/services/authorization/access-control.service';
import { ProjectUpdateForbiddenException } from '../../../domain/exceptions/project/project-update-forbidden.exception';
import { StoragePort } from '../../../ports/storage/storage.port';
import { FileProcessorService } from '../../../domain/services/files/file-processor.service';

@Injectable()
export class UpdateProjectUseCase {
  public constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly accessControlService: AccessControlService,
    private readonly storagePort: StoragePort,
    private readonly fileProcessorService: FileProcessorService,
  ) {}

  public async execute(command: IUpdateProjectCommand) {
    const { id, userId, picture, ...data } = command;

    const existingProject = await this.projectRepository.findById(id);
    if (!existingProject) {
      throw new ProjectNotFoundException();
    }
    let pictureUpdate = existingProject.picture;

    await this.accessControlService.checkAccessOrThrow(
      userId,
      ['super_admin', 'admin', 'moderator'],
      existingProject.userId,
      new ProjectUpdateForbiddenException(),
    );

    if(picture && pictureUpdate) {
      await this.storagePort.remove(pictureUpdate);
    }

    if (picture) {
      pictureUpdate = await this.fileProcessorService.processImage(picture, 'projects');
    }

    return this.projectRepository.update(existingProject.id, { ...data, picture: pictureUpdate });
  }
}