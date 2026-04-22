import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { EnumBeneficiaryDocumentType } from '../../../core/domain/value-objects/beneficiary/beneficiary-document.type';

export class BeneficiaryDocumentDto {
  @ApiProperty({
    enum: EnumBeneficiaryDocumentType,
    example: EnumBeneficiaryDocumentType.PASSPORT,
    description: 'Тип документа',
  })
  @IsEnum(EnumBeneficiaryDocumentType)
  @IsNotEmpty()
  type: EnumBeneficiaryDocumentType;

  @ApiProperty({
    example: '5000',
    required: false,
    description: 'Серия документа (для паспорта РФ – 4 цифры)',
  })
  @Matches(/^\d{4}$/, { message: 'serial must be exactly 4 digits' })
  @IsString()
  @IsOptional()
  serial?: string;

  @ApiProperty({
    example: '123456',
    description: 'Номер документа',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: '2005-10-15',
    description: 'Дата выдачи в формате YYYY-MM-DD',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date: string;

  @ApiProperty({
    example: 'ОУФМС России по г. Москве',
    required: false,
    description: 'Кем выдан (наименование органа)',
  })
  @IsString()
  @IsOptional()
  organization?: string;

  @ApiProperty({
    example: '770-001',
    required: false,
    description: 'Код подразделения',
  })
  @IsString()
  @IsOptional()
  division?: string;

  @ApiProperty({
    example: '2030-10-15',
    required: false,
    description: 'Дата окончания срока действия (если есть)',
  })
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'expireDate must be in YYYY-MM-DD format',
  })
  expireDate?: string;
}
