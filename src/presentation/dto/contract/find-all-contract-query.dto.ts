import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDecimal,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class FindAllContractQueryDto extends BaseQueryDto {
  @ApiProperty({
    description:
      'Уникальный идентификатор пользователя (возвращает контракты, где пользователь является либо заказчиком, либо исполнителем)',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор заказчика',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public clientId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public contractorId?: string;

  @ApiProperty({
    description:
      'Минимальная сумма контракта. Поиск больше или равно указанного значения',
    example: 10000,
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  public amountMin?: number;

  @ApiProperty({
    description:
      'Максимальная сумма контракта. Поиск меньше или равно указанного значения',
    example: 100000,
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  public amountMax?: number;

  @ApiProperty({
    description: 'Дата создания. Поиск больше или равно указанного значения',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtStart?: Date;

  @ApiProperty({
    description: 'Дата создания. Поиск меньше или равно указанного значения',
    example: '2024-12-31T23:59:59.999Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtEnd?: Date;

  @ApiProperty({
    description: 'Уникальный идентификатор задачи',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public taskId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор услуги',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public serviceId?: string;
}
