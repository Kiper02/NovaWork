import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Название проекта',
    example: 'Web Application',
  })
  @Length(2, 30)
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  picture?: any;
}
