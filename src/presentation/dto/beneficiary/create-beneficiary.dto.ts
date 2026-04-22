import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EnumBeneficiaryType } from '../../../core/domain/entities/finance/beneficiary.entity';
import { BeneficiaryDetailsDto } from './beneficiary-details.dto';

export class CreateBeneficiaryDto {
  @ApiProperty({ enum: EnumBeneficiaryType })
  @IsEnum(EnumBeneficiaryType)
  @IsNotEmpty()
  type: EnumBeneficiaryType;

  @ApiProperty({ type: BeneficiaryDetailsDto })
  @ValidateNested()
  @Type(() => BeneficiaryDetailsDto)
  @IsNotEmpty()
  details: BeneficiaryDetailsDto;
}
