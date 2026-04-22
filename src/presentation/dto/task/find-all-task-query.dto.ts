import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDecimal,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { EnumTaskStatus } from '../../../core/domain/entities/project/task.entity';

export class FindAllTaskQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @ApiProperty({
    description: 'Заголовок задачи. Поиск по совпадению',
    example: 'Web Application development',
    required: false,
  })
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Описание задачи. Поиск по совпадению',
    example: 'Some description',
    required: false,
  })
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Только (не)опубликованные задачи',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public isPublished?: boolean;

  @ApiProperty({
    description: 'Минимальная цена. Поиск больше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  public minPrice?: number;

  @ApiProperty({
    description:
      'Максимальная цена. Поиск меньше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  public maxPrice?: number;

  @ApiProperty({
    description: 'Искать задачи только без откликов',
    example: 1000,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public notBids?: boolean;

  @ApiProperty({
    description: 'Дата создания. Поиск больше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtStart?: Date;

  @ApiProperty({
    description: 'Дата создания. Поиск меньше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtEnd?: Date;

  @ApiProperty({
    description: 'Статус задачи',
    example: EnumTaskStatus.NOT_DISTRIBUTED,
    required: false,
  })
  @IsEnum(EnumTaskStatus)
  @IsOptional()
  public status?: EnumTaskStatus;

  @ApiProperty({
    description: 'Массив идентификаторов категорий',
    example: ['04331c2d-c1d2-4e35-8ed7-6c5171cff845'],
    required: false,
  })
  @IsUUID(4, { each: true })
  @IsArray()
  @IsOptional()
  public categoryIds?: string[] = [];
}
