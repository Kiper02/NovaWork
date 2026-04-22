import { Module } from '@nestjs/common';
import { InvitationsController } from '../../presentation/controllers/invitations.controller';
import { CreateInvitationUseCase } from '../../core/use-cases/invitation/create/create-invitation.use-case';
import { UpdateInvitationUseCase } from '../../core/use-cases/invitation/update/update-invitation.use-case';
import { FindAllInvitationUseCase } from '../../core/use-cases/invitation/find-all/find-all-invitation.use-case';
import { FindByIdInvitationUseCase } from '../../core/use-cases/invitation/find-by-id/find-by-id-invitation.use-case';

@Module({
  controllers: [InvitationsController],
  providers: [
    CreateInvitationUseCase,
    UpdateInvitationUseCase,
    FindAllInvitationUseCase,
    FindByIdInvitationUseCase,
  ],
})
export class InvitationModule {}
