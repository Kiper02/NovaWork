import { ContractRepository } from '../../../../../core/domain/repositories/project/contract.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { ContractEntity } from 'src/core/domain/entities/project/contract.entity';
import { ContractFiltersValueObject } from 'src/core/domain/value-objects/contract/contract-filters.value.object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { ContractMapper } from '../../mappers/project/contract.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContractRepositoryImpl implements ContractRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: ContractEntity): Promise<ContractEntity> {
    const model = ContractMapper.toModel(entity);
    const record = await this.prismaService.contract.create({
      data: model,
    });
    return ContractMapper.toEntity(record);
  }
  public async update(
    id: string,
    data: Partial<Omit<ContractEntity, 'id' | 'createdAt'>>,
  ): Promise<ContractEntity> {
    const model = ContractMapper.toModelUpdate(data);
    const record = await this.prismaService.contract.update({
      where: {
        id: id,
      },
      data: model,
    });
    return ContractMapper.toEntity(record);
  }
  public async findAll(
    params: ContractFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ContractEntity>> {
    const where = this.buildWhere(params);
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.contract.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.contract.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(ContractMapper.toEntity),
      total,
      pagination,
    );
  }
  public async findById(id: string): Promise<ContractEntity | null> {
    const record = await this.prismaService.contract.findUnique({
      where: { id: id },
    });
    if (!record) return null;

    return ContractMapper.toEntity(record);
  }
  public async findByServiceId(
    serviceId: string,
  ): Promise<ContractEntity | null> {
    const record = await this.prismaService.contract.findFirst({
      where: {
        serviceId: serviceId,
      },
    });

    if (!record) return null;

    return ContractMapper.toEntity(record);
  }

  public async findByTaskId(taskId: string): Promise<ContractEntity | null> {
    const record = await this.prismaService.contract.findFirst({
      where: {
        taskId: taskId,
      },
    });

    if (!record) return null;

    return ContractMapper.toEntity(record);
  }

  private buildWhere(params: ContractFiltersValueObject) {
    const where: Prisma.ContractWhereInput = {};
    if (params.taskId) {
      where.taskId = params.taskId;
    }

    if (params.serviceId) {
      where.serviceId = params.serviceId;
    }

    if (params.amountMin) {
      where.amount = {
        gte: params.amountMin,
      };
    }

    if (params.amountMax) {
      where.amount = {
        lte: params.amountMax,
      };
    }

    if (params.clientId) {
      where.clientId = params.clientId;
    }

    if (params.contractorId) {
      where.contractorId = params.contractorId;
    }

    if (params.userId) {
      where.OR = [
        { clientId: params.userId },
        { contractorId: params.contractorId },
      ];
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