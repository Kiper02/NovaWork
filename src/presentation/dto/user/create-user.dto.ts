import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'username',
    example: 'user123',
    minLength: 5,
    maxLength: 20,
  })
  @Length(5, 20)
  @IsString()
  @IsNotEmpty()
  public username: string;

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

  @ApiProperty({
    description: 'Имя',
    example: 'Иван',
  })
  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty({
    description: 'Отчество (при наличии)',
    example: 'Иванович',
  })
  @Length(1, 100)
  @IsString()
  @IsOptional()
  public middleName: string;

  @ApiProperty({
    description: 'Фамилия',
    example: 'Иванов',
  })
  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  public lastName: string;
}