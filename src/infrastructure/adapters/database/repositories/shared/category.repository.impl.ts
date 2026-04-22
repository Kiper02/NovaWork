import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { CategoryRepository } from '../../../../../core/domain/repositories/shared/category.repository';
import { CategoryEntity } from 'src/core/domain/entities/shared/category.entity';
import { CategoryFiltersValueObject } from 'src/core/domain/value-objects/category/category-filters.value.object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { CategoryMapper } from '../../mappers/chat/category.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: CategoryEntity): Promise<CategoryEntity> {
    const model = CategoryMapper.toModel(entity);
    const record = await this.prismaService.category.create({
      data: model,
      include: {
        children: true
      }
    })

    return CategoryMapper.toEntity(record)
  }
  public async update(
    id: string,
    data: Partial<Omit<CategoryEntity, 'id' | 'createdAt'>>,
  ): Promise<CategoryEntity> {
    const model = CategoryMapper.toModelUpdate(data);
    const record = await this.prismaService.category.update({
      where: {
        id: id
      },
      data: model,
      include: {
        children: true
      }
    })
    return CategoryMapper.toEntity(record)
  }
  public async findAll(
    params: CategoryFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<CategoryEntity>> {
    const where = this.buildWhere(params);
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.category.findMany({
        where: where,
        include: {
          children: true
        },
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.category.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(CategoryMapper.toEntity),
      total,
      pagination,
    );
  }
  public async findById(id: string): Promise<CategoryEntity | null> {
    const record = await this.prismaService.category.findUnique({
      where: {id: id},
      include: {
        children: true
      }
    })
    if(!record) return null;

    return CategoryMapper.toEntity(record)
  }

  public async findByIds(ids:string[]): Promise<CategoryEntity[]> {
    const records = await this.prismaService.category.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        children: true,
      },
    });

    return records.map(CategoryMapper.toEntity)
  }

  private buildWhere(params: CategoryFiltersValueObject) {
    const where: Prisma.CategoryWhereInput = {}

    if(params.name) {
      where.name = {
        contains: params.name,
        mode: 'insensitive'
      }
    }

    return where;
  }
}