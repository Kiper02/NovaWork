import { PartialType } from '@nestjs/swagger';
import { BeneficiaryDetailsDto } from './beneficiary-details.dto';

export class UpdateBeneficiaryDetailsDto extends PartialType(
  BeneficiaryDetailsDto,
) {}
