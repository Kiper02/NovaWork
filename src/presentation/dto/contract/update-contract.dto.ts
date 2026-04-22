import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { EnumContractStatus } from '../../../core/domain/entities/project/contract.entity';

export class UpdateContractDto {
  @ApiProperty({
    description: 'Сумма контракта',
    example: 60000,
    required: false,
  })
  @Max(1000000)
  @Min(100)
  @IsNumber()
  @IsOptional()
  public amount?: number;

  @ApiProperty({
    description: 'Статус контракта',
    example: EnumContractStatus.IN_PROGRESS,
    enum: EnumContractStatus,
    required: false,
  })
  @IsEnum(EnumContractStatus)
  @IsOptional()
  public status?: EnumContractStatus;

  @ApiProperty({
    description: 'Согласие заказчика',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public isClientAccepted?: boolean;

  @ApiProperty({
    description: 'Согласие исполнителя',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public isContractorAccepted?: boolean;
}
