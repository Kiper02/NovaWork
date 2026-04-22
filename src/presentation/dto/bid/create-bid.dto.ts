import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateBidDto {
  @ApiProperty({
    description: 'Уникальный идентификатор задачи',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  @IsUUID()
  @IsNotEmpty()
  public taskId: string;

  @ApiProperty({
    description: 'Цена',
    example: 10000,
  })
  @Min(100)
  @Max(150000)
  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @ApiProperty({
    description: 'Сопроводительное письмо',
    example: 'Какой то текст',
  })
  @Length(5, 10000)
  @IsString()
  @IsNotEmpty()
  public coverLetter: string;
}
