import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateBidDto {
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
  @Length(50, 10000)
  @IsString()
  @IsNotEmpty()
  public coverLetter: string;
}
