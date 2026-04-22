import { InvitationRepository } from '../../../domain/repositories/project/invitation.repository';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { WorkspaceRepository } from '../../../domain/repositories/project/workspace.repository';
import { ProjectRepository } from '../../../domain/repositories/project/project.repository';
import { ICreateInvitationCommand } from './create-invitation.command';
import { RecipientNotFoundException } from '../../../domain/exceptions/invitation/recipient-not-found.exception';
import { WorkspaceNotFoundException } from '../../../domain/exceptions/workspace/workspace-not-found.exception';
import { ProjectNotFoundException } from '../../../domain/exceptions/project/project-not-found.exception';
import { InvitationAmbiguousException } from '../../../domain/exceptions/invitation/invitation-ambiguous.exception';
import {
  InvitationMissingTargetException
} from '../../../domain/exceptions/invitation/invitation-missing-target.exception';
import { InvitationEntity } from '../../../domain/entities/project/invitation.entity';
import {v4 as uuid} from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateInvitationUseCase {
  public constructor(
    private readonly invitationRepository: InvitationRepository,
    private readonly userRepository: UserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly projectRepository: ProjectRepository
  ) {}

  public async execute(command: ICreateInvitationCommand) {
    const existingRecipient = await this.userRepository.findById(command.recipientId);
    if(!existingRecipient) {
      throw new RecipientNotFoundException()
    }

    await this.checkValidation(command.workspaceId, command.recipientId);

    const invitationEntity = new InvitationEntity(
      uuid(),
      command.title,
      command.coverLetter,
      command.senderId,
      command.recipientId,
      new Date(),
      new Date(),
      command.workspaceId ?? null,
      command.projectId ?? null
    )
    return this.invitationRepository.save(invitationEntity);
  }

  private async checkValidation(workspaceId?: string, projectId?: string) {
    if (workspaceId && projectId) {
      throw new InvitationAmbiguousException();
    }

    if (!workspaceId && !projectId) {
      throw new InvitationMissingTargetException();
    }

    if (workspaceId) {
      const existingWorkspace = await this.workspaceRepository.findById(
        workspaceId,
      );
      if (!existingWorkspace) {
        throw new WorkspaceNotFoundException();
      }
    }

    if (projectId) {
      const existingProject = await this.projectRepository.findById(
        projectId,
      );
      if (!existingProject) {
        throw new ProjectNotFoundException();
      }
    }
  }
}