import { ApiProperty } from '@nestjs/swagger';
import { EnumContractStatus } from '../../../core/domain/entities/project/contract.entity';

export class ContractResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор контракта',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Сумма контракта',
    example: 50000,
  })
  public amount: number;

  @ApiProperty({
    description: 'Уникальный идентификатор заказчика',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public clientId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public contractorId: string;

  @ApiProperty({
    description: 'Статус контракта',
    example: EnumContractStatus.IN_PROGRESS,
    enum: EnumContractStatus,
  })
  public status: EnumContractStatus;

  @ApiProperty({
    description: 'Дата согласия заказчика',
    example: '2024-01-15T12:30:00.000Z',
    required: false,
    nullable: true,
  })
  public clientAcceptedAt: Date | null;

  @ApiProperty({
    description: 'Дата согласия исполнителя',
    example: '2024-01-15T12:30:00.000Z',
    required: false,
    nullable: true,
  })
  public contractorAcceptedAt: Date | null;

  @ApiProperty({
    description:
      'Уникальный идентификатор задачи (если контракт создан на основе задачи)',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
    nullable: true,
  })
  public taskId: string | null;

  @ApiProperty({
    description:
      'Уникальный идентификатор услуги (если контракт создан на основе услуги)',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
    nullable: true,
  })
  public serviceId: string | null;

  @ApiProperty({
    description: 'Дата создания',
    example: '2024-01-15T12:30:00.000Z',
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Дата последнего обновления',
    example: '2024-01-15T12:30:00.000Z',
  })
  public updatedAt: Date;
}
