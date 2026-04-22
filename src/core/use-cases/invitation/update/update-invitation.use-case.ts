import { Injectable } from '@nestjs/common';
import { IUpdateInvitationCommand } from './update-invitation.command';
import { InvitationRepository } from '../../../domain/repositories/project/invitation.repository';
import { InvitationNotFoundException } from '../../../domain/exceptions/invitation/invitation-not-found.exception';

@Injectable()
export class UpdateInvitationUseCase {
  public constructor(
    private readonly invitationRepository: InvitationRepository,
  ) {}

  public async execute(command: IUpdateInvitationCommand) {
    const existingRecord = await this.invitationRepository.findById(command.id);

    if(!existingRecord) {
      throw new InvitationNotFoundException()
    }

    return this.invitationRepository.update(command.id, command);
  }
}