import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBeneficiaryDetailsDto } from './update-beneficiary-details.dto';
import { EnumBeneficiaryType } from '../../../core/domain/entities/finance/beneficiary.entity';

export class UpdateBeneficiaryDto {
  @ApiProperty({ enum: EnumBeneficiaryType, required: false })
  @IsEnum(EnumBeneficiaryType)
  @IsOptional()
  type?: EnumBeneficiaryType;

  @ApiProperty({
    description:
      'При обновлении полей документов и адресов необходимо передавать изменяемый объект полностью. Конкретный документ или адрес будет перезаписан целиком. Если поле не передано – остаётся без изменений.',
    type: UpdateBeneficiaryDetailsDto,
    required: false,
    example: {
      firstName: 'Иван',
      documents: [
        {
          type: 'PASSPORT',
          serial: '1234',
          number: '567890',
          date: '2020-01-01',
          division: 'ОВД',
          organization: '',
        },
      ],
    },
  })
  @ValidateNested()
  @Type(() => UpdateBeneficiaryDetailsDto)
  @IsOptional()
  details?: UpdateBeneficiaryDetailsDto;
}
