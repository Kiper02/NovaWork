import { BeneficiaryAggregate } from '../../aggregates/beneficiary.aggregate';

export abstract class BeneficiaryQueryRepository {
  public abstract findByIdForDetails(
    beneficiaryId: string,
  ): Promise<BeneficiaryAggregate | null>;
}