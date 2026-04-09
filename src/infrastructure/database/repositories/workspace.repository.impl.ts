import { WorkspaceRepository } from '../../../core/domain/repositories/workspace.repository';
import { PrismaService } from '../orm/prisma-recource/prisma.service';
import { WorkspaceMapper } from '../mappers/workspace.mapper';
import { WorkspaceEntity } from '../../../core/domain/entities/workspace.entity';
import { PaginationParamsValueObject } from '../../../core/domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../core/domain/value-objects/shared/paginated-result.value-object';
import {
  WorkspaceFiltersValueObject
} from '../../../core/domain/value-objects/workspace/workspace-filters.value-object';
import type { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';


@Injectable()
export class WorkspaceRepositoryImpl implements WorkspaceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async save(workspace: WorkspaceEntity): Promise<WorkspaceEntity> {
    const model = WorkspaceMapper.toModel(workspace);
    const result = await this.prismaService.workspace.create({
      data: model,
    });

    return WorkspaceMapper.toEntity(result);
  }

  public async findById(id: string): Promise<WorkspaceEntity | null> {
    const result = await this.prismaService.workspace.findUnique({
      where: { id },
    });
    if (!result) return null;
    return WorkspaceMapper.toEntity(result);
  }

  public async findByUserId(
    userId: string,
    params: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<WorkspaceEntity>> {
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.workspace.findMany({
        where: { userId },
        skip: params.skip,
        take: params.take,
      }),
      this.prismaService.workspace.count({ where: { userId } }),
    ]);

    return new PaginatedResultValueObject(
      data.map(WorkspaceMapper.toEntity),
      total,
      params,
    );
  }

  public async update(
    workspace: Partial<WorkspaceEntity>,
  ): Promise<WorkspaceEntity> {
    return this.prismaService.workspace.update({
      where: {
        id: workspace.id,
      },
      data: workspace,
    });
  }

  public async findAll(
    params: WorkspaceFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<WorkspaceEntity>> {
    const where = this.buildWhere(params);
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.workspace.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.workspace.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(WorkspaceMapper.toEntity),
      total,
      pagination,
    );
  }

  public async findDefaultUserWorkspace(userId: string): Promise<WorkspaceEntity | null> {
    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        userId_isDefault: {
          userId: userId,
          isDefault: true,
        }
      }
    })

    if(!workspace) return null;

    return WorkspaceMapper.toEntity(workspace)
  }

  private buildWhere(params: WorkspaceFiltersValueObject) {
    const where: Prisma.WorkspaceWhereInput = {};
    if (params.userId) {
      where.userId = params.userId;
    }

    if (params.name) {
      where.name = {
        contains: params.name,
        mode: 'insensitive',
      };
    }
    return where;
  }
}
