import { ProfileRepository } from '../../../core/domain/repositories/profile.repository';
import { PrismaService } from '../orm/prisma-recource/prisma.service';
import { ProfileFiltersValueObject } from '../../../core/domain/value-objects/profile/profile-filters.value.object';
import { PaginationParamsValueObject } from '../../../core/domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../core/domain/value-objects/shared/paginated-result.value-object';
import { ProfileEntity } from '../../../core/domain/entities/profile.entity';
import { ProfileMapper } from '../mappers/profile.mapper';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileRepositoryImpl implements ProfileRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: ProfileEntity): Promise<ProfileEntity> {
    const model = ProfileMapper.toModel(entity);
    const result = await this.prismaService.profile.create({ data: model });
    return ProfileMapper.toEntity(result);
  }

  public async update(
    id: string,
    data: Partial<Omit<ProfileEntity, 'id'>>,
  ): Promise<ProfileEntity> {
    const model = ProfileMapper.toModelUpdate(data);
    const result = await this.prismaService.profile.update({
      where: {
        id: id,
      },
      data: model,
    });

    return ProfileMapper.toEntity(result);
  }

  public async findAll(
    params: ProfileFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ProfileEntity>> {
    const where = this.buildWhere(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.profile.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.profile.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(ProfileMapper.toEntity),
      total,
      pagination,
    );
  }

  public async findByUserId(userId: string): Promise<ProfileEntity | null> {
    const result = await this.prismaService.profile.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!result) return null;
    return ProfileMapper.toEntity(result);
  }

  private buildWhere(params: ProfileFiltersValueObject) {
    const where: Prisma.ProfileWhereInput = {};

    if (params.userId) {
      where.userId = params.userId;
    }

    return where;
  }
}