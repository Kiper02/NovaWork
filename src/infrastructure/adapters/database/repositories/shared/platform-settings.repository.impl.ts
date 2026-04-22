import { PlatformSettingsEntity } from 'src/core/domain/entities/shared/platform-settings.entity';
import { PlatformSettingsRepository } from '../../../../../core/domain/repositories/shared/platform-settings.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { PlatformSettingsMapper } from '../../mappers/shared/platform-settings.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformSettingsRepositoryImpl implements PlatformSettingsRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(
    settings: PlatformSettingsEntity,
  ): Promise<PlatformSettingsEntity> {
    const updateData = PlatformSettingsMapper.toModelUpdate(settings);
    const createData = PlatformSettingsMapper.toModel(settings);

    const record = await this.prismaService.platformSettings.upsert({
      where: { id: 'singleton' },
      update: updateData,
      create: createData,
    });

    return PlatformSettingsMapper.toEntity(record);
  }

  public async get(): Promise<PlatformSettingsEntity | null> {
    const settings = await this.prismaService.platformSettings.findUnique({
      where: {
        id: 'singleton',
      },
    });

    if (!settings) return null;
    return PlatformSettingsMapper.toEntity(settings);
  }
}