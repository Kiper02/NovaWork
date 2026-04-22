import { ClientAlreadySignedContractException } from '../../exceptions/contract/client-already-signed-contract.exception';
import { ContractorAlreadySignedContractException } from '../../exceptions/contract/contractor-already-signed-contract.exception';
import { ContractAlreadyAcceptedException } from '../../exceptions/contract/contract-already-accepted.exception';

export class ContractEntity {
  public constructor(
    public readonly id: string,
    public amount: number,
    public readonly clientId: string,
    public readonly contractorId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly taskId: string | null,
    public readonly serviceId: string | null,
    public status: EnumContractStatus,
    public clientAcceptedAt: Date | null,
    public contractorAcceptedAt: Date | null,
    public readonly commission: number
  ) {}

  public acceptByClient(): void {
    if (this.clientAcceptedAt) throw new ClientAlreadySignedContractException();
    this.clientAcceptedAt = new Date();
    if (this.contractorAcceptedAt) this.status = EnumContractStatus.IN_PROGRESS;
  }

  public acceptByContractor(): void {
    if (this.contractorAcceptedAt)
      throw new ContractorAlreadySignedContractException();
    this.contractorAcceptedAt = new Date();
    if (this.clientAcceptedAt) this.status = EnumContractStatus.IN_PROGRESS;
  }

  public updateAmount(newAmount: number): void {
    if (this.clientAcceptedAt !== null || this.contractorAcceptedAt !== null)
      throw new ContractAlreadyAcceptedException();
    this.amount = newAmount;
  }
}

export enum EnumContractStatus {
  SEND = 'SEND',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}
