import { Injectable } from '@nestjs/common';
import { InvitationRepository } from '../../../../../core/domain/repositories/project/invitation.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { InvitationEntity } from 'src/core/domain/entities/project/invitation.entity';
import { InvitationFiltersValueObject } from 'src/core/domain/value-objects/invitation/invitation-filters.value.object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { InvitationMapper } from '../../mappers/project/invitation.mapper';
import type { Prisma } from '@prisma/client';

@Injectable()
export class InvitationRepositoryImpl implements InvitationRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: InvitationEntity): Promise<InvitationEntity> {
    const model = InvitationMapper.toModel(entity);
    const record = await this.prismaService.invitation.create({data: model})
    return InvitationMapper.toEntity(record);
  }
  public async update(
    id: string,
    data: Partial<Omit<InvitationEntity, 'id' | 'createdAt'>>,
  ): Promise<InvitationEntity> {
    const model = InvitationMapper.toModelUpdate(data);
    const record = await this.prismaService.invitation.update({
      where: {
        id: id
      },
      data: model,
    });
    return InvitationMapper.toEntity(record);
  }
  public async findAll(
    params: InvitationFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<InvitationEntity>> {
    const where = this.buildWhere(params)
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.invitation.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.invitation.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(InvitationMapper.toEntity),
      total,
      pagination,
    );
  }
  public async findById(id: string): Promise<InvitationEntity | null> {
    const record = await this.prismaService.invitation.findUnique({ where: { id } })
    if(!record) return null;

    return InvitationMapper.toEntity(record)
  }

  private buildWhere(params: InvitationFiltersValueObject) {
    const where: Prisma.InvitationWhereInput = {}

    if(params.projectId) {
      where.projectId = params.projectId
    }

    if(params.workspaceId) {
      where.workspaceId = params.workspaceId
    }

    if(params.recipientId) {
      where.recipientId = params.recipientId
    }

    if(params.createdAtStart) {
      where.createdAt = {
        gte: params.createdAtStart
      }
    }

    if(params.createdAtEnd) {
      where.createdAt = {
        lte: params.createdAtEnd
      }
    }

    return where;
  }
}