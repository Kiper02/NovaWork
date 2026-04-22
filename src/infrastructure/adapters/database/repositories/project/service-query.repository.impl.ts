import { Injectable } from '@nestjs/common';
import { ServiceQueryRepository } from '../../../../../core/domain/repositories/project/service-query.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { ServiceAggregate } from 'src/core/domain/aggregates/service.aggregate';
import { ServiceFiltersValueObject } from 'src/core/domain/value-objects/service/service-filters.value-object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { ServiceWhereBuilder } from '../../builders/service-where.builder';
import { ServiceMapper } from '../../mappers/project/service.mapper';
import { CategoryMapper } from '../../mappers/chat/category.mapper';
import { UserEntity } from '../../../../../core/domain/entities/user/user.entity';
import { UserMapper } from '../../mappers/user/user.mapper';
import { ProfileEntity } from '../../../../../core/domain/entities/user/profile.entity';
import { ProfileMapper } from '../../mappers/user/profile.mapper';
import { UserAggregate } from '../../../../../core/domain/aggregates/user.aggregate';

@Injectable()
export class ServiceQueryRepositoryImpl implements ServiceQueryRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAllForDetails(
    params: ServiceFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ServiceAggregate>> {
    const where = ServiceWhereBuilder.build(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.service.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
        include: {
          serviceCategories: {
            include: {
              category: {
                include: {
                  children: true,
                },
              },
            },
          },
          user: {
            include: {
              profile: true
            }
          }
        },
      }),
      this.prismaService.service.count({ where: where }),
    ]);

    const aggregate: ServiceAggregate[] = data.map((service) => {
      const serviceEntity = ServiceMapper.toEntity(service);
      const categoriesEntities = service.serviceCategories.map((taskCategory) =>
        CategoryMapper.toEntity(taskCategory.category),
      );
      const user = UserMapper.toEntity(service.user)

      let profile: ProfileEntity | null = null;

      if (service.user.profile) {
        profile = ProfileMapper.toEntity(service.user.profile);
      }

      const userAggregate = new UserAggregate(user, profile, null, null);

      return {
        service: serviceEntity,
        categories: categoriesEntities,
        creator: userAggregate,
      };
    });

    return new PaginatedResultValueObject(aggregate, total, pagination);
  }
  public async findByIdForDetails(
    serviceId: string,
  ): Promise<ServiceAggregate | null> {
    const record = await this.prismaService.service.findUnique({
      where: { id: serviceId },
      include: {
        serviceCategories: {
          include: {
            category: {
              include: {
                children: true,
              },
            },
          },
        },
        user: {
          include: {
            profile: true
          }
        }
      },
    });

    if (!record) return null;

    const service = ServiceMapper.toEntity(record);
    const categories = record.serviceCategories.map((taskCategory) =>
      CategoryMapper.toEntity(taskCategory.category),
    );
    const user = UserMapper.toEntity(record.user)

    let profile: ProfileEntity | null = null;

    if (record.user.profile) {
      profile = ProfileMapper.toEntity(record.user.profile);
    }

    const userAggregate = new UserAggregate(user, profile, null, null);

    return new ServiceAggregate(service, categories, userAggregate);
  }
}