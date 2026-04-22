import { BeneficiaryEntity } from '../entities/finance/beneficiary.entity';
import { AccountEntity } from '../entities/finance/account.entity';
import { UserEntity } from '../entities/user/user.entity';

export class BeneficiaryAggregate {
  constructor(
    public readonly beneficiary: BeneficiaryEntity,
    public readonly account: AccountEntity,
    public readonly user: UserEntity
  ) {}
}
