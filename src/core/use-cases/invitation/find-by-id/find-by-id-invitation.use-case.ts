import { Injectable } from '@nestjs/common';
import { InvitationRepository } from '../../../domain/repositories/project/invitation.repository';
import { IFindByIdInvitationCommand } from './find-by-id-invitation.command';
import { InvitationNotFoundException } from '../../../domain/exceptions/invitation/invitation-not-found.exception';

@Injectable()
export class FindByIdInvitationUseCase {
  public constructor(
    private readonly invitationRepository: InvitationRepository
  ) {
  }

  public async execute(command: IFindByIdInvitationCommand) {
    const invitation = await this.invitationRepository.findById(command.invitationId);
    if(!invitation) {
      throw new InvitationNotFoundException()
    }

    return invitation
  }
}