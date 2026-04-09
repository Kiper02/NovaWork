import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'password',
    example: 'password123',
    minLength: 5,
    maxLength: 100,
  })
  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    description: 'email',
    example: 'user@mail.ru',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;
}
