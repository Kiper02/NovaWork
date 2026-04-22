import { ApiProperty } from '@nestjs/swagger';

export class AccountResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор аккаунта',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public userId: string;

  @ApiProperty({
    description: 'Доступный баланс пользователя',
    example: 0,
  })
  public availableBalance: number;

  @ApiProperty({
    description: 'Замороженные средства пользователя',
    example: 0,
  })
  public frozenBalance: number;

  @ApiProperty({
    description: 'Доступное пространство для статики',
    example: 100_000_000_000,
  })
  public storageQuotaBytes: number;

  @ApiProperty({
    description: 'Использованное пространство',
    example: 100_000,
  })
  public storageUsedBytes: number;
}
