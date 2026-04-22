import { CreateContractDto } from '../dto/contract/create-contract.dto';
import { UpdateContractDto } from '../dto/contract/update-contract.dto';
import { FindAllContractQueryDto } from '../dto/contract/find-all-contract-query.dto';
import { IFindAllContractCommand } from '../../core/use-cases/contract/find-all/find-all-contract.command';
import { ContractEntity } from '../../core/domain/entities/project/contract.entity';
import { ContractResponseDto } from '../dto/contract/contract-response.dto';
import { IUpdateContractCommand } from '../../core/use-cases/contract/update/update-contract.command';
import { ICreateContractCommand } from '../../core/use-cases/contract/create/create-contract.command';
import { IFindByIdContractCommand } from '../../core/use-cases/contract/find-by-id/find-by-id-contract.command';
import { FindMyContractQueryDto } from '../dto/contract/find-my-contract-query.dto';

export class ContractMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateContractDto,
  ): ICreateContractCommand {
    return {
      amount: dto.amount,
      clientId: userId,
      contractorId: dto.contractorId,
      taskId: dto.taskId,
      serviceId: dto.serviceId,
    };
  }

  public static toUpdateCommand(
    contractId: string,
    userId: string,
    dto: UpdateContractDto,
  ): IUpdateContractCommand {
    return {
      contractId,
      userId,
      amount: dto.amount,
      status: dto.status,
      isClientAccepted: dto.isClientAccepted,
      isContractorAccepted: dto.isContractorAccepted,
    };
  }

  public static toFindByIdCommand(
    contractId: string,
    userId: string
  ): IFindByIdContractCommand {
    return {
      contractId: contractId,
      userId: userId
    };
  }

  public static toFindAllCommand(
    dto: FindAllContractQueryDto,
  ): IFindAllContractCommand {
    return {
      amountMin: dto.amountMin,
      amountMax: dto.amountMax,
      clientId: dto.clientId,
      contractorId: dto.contractorId,
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      taskId: dto.taskId,
      serviceId: dto.serviceId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindMyCommand(userId: string, dto: FindMyContractQueryDto): IFindAllContractCommand {
    return {
      userId: userId,
      amountMin: dto.amountMin,
      amountMax: dto.amountMax,
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      taskId: dto.taskId,
      serviceId: dto.serviceId,
      page: dto.page,
      limit: dto.limit,
    };
  };

  public static toResponse(entity: ContractEntity): ContractResponseDto {
    return {
      id: entity.id,
      amount: entity.amount,
      clientId: entity.clientId,
      contractorId: entity.contractorId,
      status: entity.status,
      clientAcceptedAt: entity.clientAcceptedAt,
      contractorAcceptedAt: entity.contractorAcceptedAt,
      taskId: entity.taskId,
      serviceId: entity.serviceId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
