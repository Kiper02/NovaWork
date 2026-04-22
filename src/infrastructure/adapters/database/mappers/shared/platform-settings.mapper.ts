import { PlatformSettings, Prisma } from '@prisma/client';
import {
  IPlatformSettings,
  PlatformSettingsEntity,
} from '../../../../../core/domain/entities/shared/platform-settings.entity';

export class PlatformSettingsMapper {
  public static toEntity(model: PlatformSettings): PlatformSettingsEntity {
    const settings = model.settings as unknown as IPlatformSettings;
    return new PlatformSettingsEntity(
      model.id,
      settings,
      model.updatedAt,
      model.updatedBy,
      model.version,
    );
  }

  public static toModel(entity: PlatformSettingsEntity): Prisma.PlatformSettingsCreateInput {
    return {
      id: entity.id,
      settings: entity.settings as unknown as Prisma.InputJsonValue,
      version: entity.version,
      updatedBy: entity.updatedBy,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<PlatformSettingsEntity, 'id'>>,
  ): Prisma.PlatformSettingsUpdateInput {
    const result: Prisma.PlatformSettingsUpdateInput = {};

    if (data.settings) data.settings = data.settings;
    if (data.updatedBy) result.updatedBy = data.updatedBy;
    if (data.version) result.version = data.version;

    return result;
  }
}
