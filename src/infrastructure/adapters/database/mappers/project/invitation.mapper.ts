import { Invitation, type Prisma } from '@prisma/client';
import { InvitationEntity } from '../../../../../core/domain/entities/project/invitation.entity';

export class InvitationMapper {
  public static toEntity(model: Invitation): InvitationEntity {
    return {
      id: model.id,
      title: model.title,
      coverLetter: model.coverLetter,
      recipientId: model.recipientId,
      senderId: model.senderId,
      projectId: model.projectId,
      workspaceId: model.workspaceId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  public static toModel(entity: InvitationEntity): Invitation {
    return {
      id: entity.id,
      title: entity.title,
      coverLetter: entity.coverLetter,
      recipientId: entity.recipientId,
      senderId: entity.senderId,
      projectId: entity.projectId,
      workspaceId: entity.workspaceId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<InvitationEntity, 'id' | 'createdAt'>>,
  ): Prisma.InvitationUpdateInput {
    const result: Prisma.InvitationUpdateInput = {};

    if(data.title) result.title = data.title;
    if(data.coverLetter) result.coverLetter = data.coverLetter;
    if(data.updatedAt) result.updatedAt = data.updatedAt;

    return result;
  }
}
