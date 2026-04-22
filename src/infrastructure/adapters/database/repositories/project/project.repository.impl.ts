import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../../../../core/domain/repositories/project/project.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { ProjectEntity } from 'src/core/domain/entities/project/project.entity';
import { ProjectFiltersValueObject } from 'src/core/domain/value-objects/project/project-filters.value.object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { ProjectMapper } from '../../mappers/project/project.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  public constructor(private readonly prismaService: PrismaService) {}
  public async save(entity: ProjectEntity): Promise<ProjectEntity> {
    const model = ProjectMapper.toModel(entity);
    const record = await this.prismaService.project.create({data: model})
    return ProjectMapper.toEntity(record)
  }
  public async update(
    id: string,
    data: Partial<Omit<ProjectEntity, 'id' | 'createdAt'>>,
  ): Promise<ProjectEntity> {
    const model = ProjectMapper.toModelUpdate(data);
    const record = await this.prismaService.project.update({
      where: {
        id: id,
      },
      data: model,
    });
    return ProjectMapper.toEntity(record);
  }
  public async findAll(
    params: ProjectFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ProjectEntity>> {
    const where = this.buildWhere(params);
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.project.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.project.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(ProjectMapper.toEntity),
      total,
      pagination,
    );
  }
  public async findById(id: string): Promise<ProjectEntity | null> {
    const record = await this.prismaService.project.findUnique({ where: { id } })

    if(!record) return null

    return ProjectMapper.toEntity(record)
  }

  private buildWhere(params: ProjectFiltersValueObject) {
    const where: Prisma.ProjectWhereInput = {};
    if (params.userId) {
      where.userId = params.userId;
    }

    if (params.createdAtStart) {
      where.createdAt = {
        gte: params.createdAtStart,
      };
    }

    if (params.createdAtEnd) {
      where.createdAt = {
        lte: params.createdAtEnd,
      };
    }

    return where;
  }
}