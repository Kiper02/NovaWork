import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Имя',
    example: 'Иван',
  })
  @Length(1, 50)
  @IsString()
  @IsOptional()
  public firstName?: string;

  @ApiProperty({
    description: 'Отчество',
    example: 'Иванович',
  })
  @Length(1, 50)
  @IsString()
  @IsOptional()
  public middleName?: string;

  @ApiProperty({
    description: 'Фамилия',
    example: 'Иванов',
  })
  @Length(1, 50)
  @IsString()
  @IsOptional()
  public lastName?: string;

  @ApiProperty({
    description: 'О себе',
    example: 'Опытный разработчик',
    required: false,
  })
  @Length(0, 500)
  @IsString()
  @IsOptional()
  public about?: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'admin',
    required: false,
  })
  @Length(0, 50)
  @IsString()
  @IsOptional()
  public role?: string;
}
