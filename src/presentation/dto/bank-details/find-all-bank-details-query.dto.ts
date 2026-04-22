import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { BaseQueryDto } from '../shared/base-query.dto';
import { EnumBankDetailsType } from '../../../core/domain/entities/finance/bank-details.entity';

export class FindAllBankDetailsQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Фильтр по идентификатору бенефициара',
    required: false,
    example: '61f656e0-0a86-4ec2-bd43-232499f7ad66',
  })
  @IsUUID()
  @IsOptional()
  beneficiaryId?: string;

  @ApiProperty({
    description: 'Тип банковских реквизитов',
    enum: EnumBankDetailsType,
    example: EnumBankDetailsType.CARD,
  })
  @IsEnum(EnumBankDetailsType)
  @IsOptional()
  type?: EnumBankDetailsType;
}
