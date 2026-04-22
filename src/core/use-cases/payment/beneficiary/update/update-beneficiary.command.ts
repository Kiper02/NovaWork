import {
  BeneficiaryDetailsValueObject
} from '../../../../domain/value-objects/beneficiary/beneficiary-details.value-object';
import { EnumBeneficiaryType } from '../../../../domain/entities/finance/beneficiary.entity';

export interface IUpdateBeneficiaryCommand {
  beneficiaryId: string;
  userId: string;
  type?: EnumBeneficiaryType;
  details?: Partial<BeneficiaryDetailsValueObject>;
}