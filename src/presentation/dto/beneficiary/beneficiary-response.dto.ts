import { ApiProperty } from '@nestjs/swagger';
import { BeneficiaryDetailsDto } from './beneficiary-details.dto';
import { EnumBeneficiaryType } from '../../../core/domain/entities/finance/beneficiary.entity';

export class BeneficiaryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountId: string;

  @ApiProperty({ enum: EnumBeneficiaryType })
  type: EnumBeneficiaryType;

  @ApiProperty({ nullable: true })
  externalId: string | null;

  @ApiProperty({ type: BeneficiaryDetailsDto })
  details: BeneficiaryDetailsDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
