import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Уникальный идентификатор чата',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  @IsUUID()
  @IsNotEmpty()
  public chatId: string;

  @ApiProperty({
    description: 'Текст сообщения',
    example: 'Hello World',
  })
  @Length(1, 1000)
  @IsString()
  @IsOptional()
  public text?: string;
}