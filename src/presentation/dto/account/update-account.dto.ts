import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsOptional,
} from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public userId: string;

  @ApiProperty({
    description: 'Доступный баланс пользователя',
    example: 0,
  })
  @IsDecimal()
  @IsOptional()
  public availableBalance?: number;

  @ApiProperty({
    description: 'Замороженные средства пользователя',
    example: 0,
  })
  @IsDecimal()
  @IsOptional()
  public frozenBalance?: number;
}
