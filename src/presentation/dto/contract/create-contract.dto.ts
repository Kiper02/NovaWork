import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateContractDto {
  @ApiProperty({
    description: 'Сумма контракта',
    example: 50000,
  })
  @Max(1000000)
  @Min(100)
  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  @IsUUID()
  @IsNotEmpty()
  public contractorId: string;

  @ApiProperty({
    description:
      'Уникальный идентификатор задачи (если контракт создан на основе задачи)',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public taskId?: string;

  @ApiProperty({
    description:
      'Уникальный идентификатор услуги (если контракт создан на основе услуги)',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public serviceId?: string;
}
