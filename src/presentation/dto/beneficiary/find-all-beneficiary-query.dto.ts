import { EnumBeneficiaryType } from '../../../core/domain/entities/finance/beneficiary.entity';
import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllBeneficiaryQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Уникальный идентификатор аккаунта',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    description: 'Тип бенефициара',
    example: 'FL_RESIDENT',
    required: false,
  })
  @IsEnum(EnumBeneficiaryType)
  @IsString()
  @IsOptional()
  type?: EnumBeneficiaryType;

  @ApiProperty({
    description: 'Дата создания. Поиск больше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtStart?: Date;

  @ApiProperty({
    description: 'Дата создания. Поиск меньше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtEnd?: Date;
}