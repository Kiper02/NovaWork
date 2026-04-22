import { EnumContractStatus } from '../../../domain/entities/project/contract.entity';

export interface IUpdateContractCommand {
  contractId: string;
  userId: string;
  amount?: number;
  status?: EnumContractStatus;
  isClientAccepted?: boolean;
  isContractorAccepted?: boolean;
}