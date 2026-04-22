import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public userId: string;

  @ApiProperty({
    description: 'Доступный баланс пользователя',
    example: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  public availableBalance: number;

  @ApiProperty({
    description: 'Замороженные средства пользователя',
    example: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  public frozenBalance: number;
}
