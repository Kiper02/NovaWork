import { EnumBeneficiaryType } from '../../../../domain/entities/finance/beneficiary.entity';
import {
  BeneficiaryDetailsValueObject
} from '../../../../domain/value-objects/beneficiary/beneficiary-details.value-object';

export interface ICreateBeneficiaryCommand {
  userId: string;
  type: EnumBeneficiaryType;
  details: BeneficiaryDetailsValueObject
}
