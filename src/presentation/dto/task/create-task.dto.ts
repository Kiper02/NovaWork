import { EnumTaskStatus } from '../../../core/domain/entities/task.entity';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Заголовок задачи',
    example: 'Web Application development',
  })
  @Length(2, 30)
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Описание задачи',
    example: 'Some description',
  })
  @Length(20, 1000)
  @IsString()
  @IsNotEmpty()
  public description: string;

  @ApiProperty({
    description: 'Минимальная цена',
    example: 1000,
  })
  @Max(150000)
  @Min(100)
  @IsString()
  @IsNotEmpty()
  public minPrice: number;

  @ApiProperty({
    description: 'Максимальная цена',
    example: 1000,
  })
  @Max(150000)
  @Min(100)
  @IsString()
  @IsNotEmpty()
  public maxPrice: number;

  @ApiProperty({
    description: 'Статус задачи',
    example: EnumTaskStatus.NOT_DISTRIBUTED,
    default: EnumTaskStatus.NOT_DISTRIBUTED,
    required: false,
  })
  @IsEnum(EnumTaskStatus)
  @IsString()
  @IsNotEmpty()
  public status?: EnumTaskStatus = EnumTaskStatus.NOT_DISTRIBUTED;

  @ApiProperty({
    description: 'Опубликовать ли задачу',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  public isPublished?: boolean = true;

  @ApiProperty({
    description:
      'ID рабочего пространства, к которому будет принадлежать задача',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
    default: 'ID рабочего пространства, созданного по умолчанию',
  })
  @IsUUID()
  @IsString()
  @IsOptional()
  public workspaceId?: string;

  @ApiProperty({
    description: 'ID проекта, к которому будет принадлежать задача',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsString()
  @IsOptional()
  public projectId?: string;
}