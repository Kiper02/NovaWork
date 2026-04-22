import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateInvitationDto {
  @ApiProperty({
    description: 'Заголовок письма',
    example: 'Какой то текст',
  })
  @Length(2, 50)
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Сопроводительное письмо',
    example: 'Какой то текст',
  })
  @Length(50, 10000)
  @IsString()
  @IsOptional()
  public coverLetter?: string;

  @ApiProperty({
    description: 'Цена',
    example: 10000,
  })
  @Min(100)
  @Max(150000)
  @IsNumber()
  @IsOptional()
  public amount?: number;
}
