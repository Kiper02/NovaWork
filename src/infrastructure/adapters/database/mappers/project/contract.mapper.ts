import { Contract, Prisma } from '@prisma/client';
import {
  ContractEntity,
  EnumContractStatus,
} from '../../../../../core/domain/entities/project/contract.entity';

export class ContractMapper {
  public static toEntity(model: Contract): ContractEntity {
    return new ContractEntity(
      model.id,
      model.amount.toNumber(),
      model.clientId,
      model.contractorId,
      new Date(),
      new Date(),
      model.taskId,
      model.serviceId,
      model.status as EnumContractStatus,
      model.clientAcceptedAt ?? null,
      model.contractorAcceptedAt ?? null,
      model.commission,
    );
  }

  public static toModel(entity: ContractEntity) {
    const input: Prisma.ContractCreateInput = {
      id: entity.id,
      amount: entity.amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: entity.status,
      clientAcceptedAt: entity.clientAcceptedAt,
      contractorAcceptedAt: entity.contractorAcceptedAt,
      commission: entity.commission,
      client: {
        connect: {
          id: entity.clientId,
        },
      },
      contractor: {
        connect: {
          id: entity.contractorId,
        },
      },
    };
    if (entity.taskId) {
      input.task = {
        connect: {
          id: entity.taskId,
        },
      };
    }

    if (entity.serviceId) {
      input.service = {
        connect: {
          id: entity.serviceId,
        },
      };
    }

    return input;
  }

  public static toModelUpdate(
    data: Partial<Omit<ContractEntity, 'id' | 'createdAt'>>,
  ): Prisma.ContractUpdateInput {
    const result: Prisma.ContractUpdateInput = {};

    if (data.amount) result.amount = data.amount;
    if (data.clientAcceptedAt) result.clientAcceptedAt = data.clientAcceptedAt;
    if (data.contractorAcceptedAt)
      result.contractorAcceptedAt = data.contractorAcceptedAt;
    if (data.status) result.status = data.status;
    if (data.updatedAt) result.updatedAt = data.updatedAt;

    return result;
  }
}
