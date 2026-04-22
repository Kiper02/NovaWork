import { GlobalRole } from '@prisma/client';
import { GlobalRoleEntity } from '../../../../../core/domain/entities/user/global-role.entity';

export class GlobalRoleMapper {
  public static toEntity(model: GlobalRole): GlobalRoleEntity {
    return {
      id: model.id,
      name: model.name,
    };
  }

  public static toModel(entity: GlobalRoleEntity): GlobalRole {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
