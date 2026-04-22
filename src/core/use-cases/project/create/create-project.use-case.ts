import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/repositories/project/project.repository';
import { ICreateProjectCommand } from './create-project.command';
import {v4 as uuid} from 'uuid';
import { ProjectEntity } from '../../../domain/entities/project/project.entity';
import { FileProcessorService } from '../../../domain/services/files/file-processor.service';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly fileProcessorService: FileProcessorService

  ) {}

  public async execute(command: ICreateProjectCommand) {
    let picture: string | null = null;

    if(command.picture) {
      picture = await this.fileProcessorService.processImage(command.picture, 'projects');
    }

    const projectEntity = new ProjectEntity(
      uuid(),
      command.title,
      picture,
      command.userId,
      new Date(),
      new Date()
    )

    return this.projectRepository.save(projectEntity);
  }
}