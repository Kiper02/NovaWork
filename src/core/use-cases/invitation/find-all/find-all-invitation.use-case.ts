import { Injectable } from '@nestjs/common';
import { InvitationRepository } from '../../../domain/repositories/project/invitation.repository';
import { IFindAllInvitationCommand } from './find-all-invitation.command';
import { InvitationFiltersValueObject } from '../../../domain/value-objects/invitation/invitation-filters.value.object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindAllInvitationUseCase {
  public constructor(
    private readonly invitationRepository: InvitationRepository,
  ) {}

  public async execute(command: IFindAllInvitationCommand) {
    const params = new InvitationFiltersValueObject(
      command.senderId,
      command.recipientId,
      command.workspaceId,
      command.projectId,
      command.createdAtStart,
      command.createdAtEnd,
    );
    const pagination = new PaginationParamsValueObject(
      command.page,
      command.limit,
    );

    return this.invitationRepository.findAll(params, pagination);
  }
}
