import { EnumTaskStatus } from '../../../core/domain/entities/task.entity';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Заголовок задачи',
    example: 'Web Application development',
  })
  @Length(2, 30)
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Описание задачи',
    example: 'Some description',
  })
  @Length(20, 1000)
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Минимальная цена',
    example: 1000,
  })
  @Max(150000)
  @Min(100)
  @IsString()
  @IsOptional()
  public minPrice?: number;

  @ApiProperty({
    description: 'Максимальная цена',
    example: 1000,
  })
  @Max(150000)
  @Min(100)
  @IsString()
  @IsOptional()
  public maxPrice?: number;

  @ApiProperty({
    description: 'Статус задачи',
    example: EnumTaskStatus.NOT_DISTRIBUTED,
    default: EnumTaskStatus.NOT_DISTRIBUTED,
    required: false,
  })
  @IsEnum(EnumTaskStatus)
  @IsString()
  @IsOptional()
  public status?: EnumTaskStatus = EnumTaskStatus.NOT_DISTRIBUTED;

  @ApiProperty({
    description: 'Опубликовать ли задачу',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public isPublished?: boolean = true;
}
