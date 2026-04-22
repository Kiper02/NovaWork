import { CreateInvitationDto } from '../dto/invitation/create-invitation.dto';
import { ICreateInvitationCommand } from '../../core/use-cases/invitation/create/create-invitation.command';
import { UpdateInvitationDto } from '../dto/invitation/update-invitation.dto';
import { IUpdateInvitationCommand } from '../../core/use-cases/invitation/update/update-invitation.command';
import { FindAllInvitationQueryDto } from '../dto/invitation/find-all-invitation-query.dto';
import { IFindAllInvitationCommand } from '../../core/use-cases/invitation/find-all/find-all-invitation.command';
import { FindMyInvitationQueryDto } from '../dto/invitation/find-my-invitation-query.dto';
import { IFindByIdInvitationCommand } from '../../core/use-cases/invitation/find-by-id/find-by-id-invitation.command';
import { InvitationEntity } from '../../core/domain/entities/project/invitation.entity';
import { InvitationResponseDto } from '../dto/invitation/invitation-response.dto';


export class InvitationMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateInvitationDto,
  ): ICreateInvitationCommand {
    return {
      title: dto.title,
      coverLetter: dto.coverLetter,
      senderId: userId,
      recipientId: dto.recipientId,
      workspaceId: dto.workspaceId,
      projectId: dto.projectId,
    };
  }

  public static toUpdateCommand(
    id: string,
    userId: string,
    dto: UpdateInvitationDto,
  ): IUpdateInvitationCommand {
    return {
      id: id,
      title: dto.title,
      coverLetter: dto.coverLetter,
      userId: userId
    };
  }

  public static toFindAllCommand(
    userId: string,
    dto: FindAllInvitationQueryDto,
  ): IFindAllInvitationCommand {
    return {
      userId: userId,
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      projectId: dto.projectId,
      workspaceId: dto.workspaceId,
      senderId: dto.senderId,
      recipientId: dto.recipientId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindMyCommand(userId: string, dto: FindMyInvitationQueryDto): IFindAllInvitationCommand {
    return {
      userId: userId,
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      projectId: dto.projectId,
      workspaceId: dto.workspaceId,
      senderId: dto.senderId,
      recipientId: dto.recipientId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindByIdCommand(
    userId: string,
    invitationId: string,
  ): IFindByIdInvitationCommand {
    return {
      userId: userId,
      invitationId: invitationId,
    };
  }

  public static toResponse(entity: InvitationEntity): InvitationResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      coverLetter: entity.coverLetter,
      senderId: entity.senderId,
      recipientId: entity.recipientId,
      workspaceId: entity.workspaceId ?? null,
      projectId: entity.projectId ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
