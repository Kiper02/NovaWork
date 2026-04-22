import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty({
    description: 'Текст сообщения',
    example: 'Hello World',
  })
  @Length(1, 1000)
  @IsString()
  @IsOptional()
  public text?: string;
}