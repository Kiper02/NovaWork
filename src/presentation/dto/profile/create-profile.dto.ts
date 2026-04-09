import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  @IsUUID()
  @IsNotEmpty()
  public userId: string;

  @ApiProperty({
    description: 'Имя',
    example: 'Иван',
  })
  @Length(1, 50)
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty({
    description: 'Отчество',
    example: 'Иванович',
  })
  @Length(1, 50)
  @IsString()
  @IsNotEmpty()
  public middleName: string;

  @ApiProperty({
    description: 'Фамилия',
    example: 'Иванов',
  })
  @Length(1, 50)
  @IsString()
  @IsNotEmpty()
  public lastName: string;
}