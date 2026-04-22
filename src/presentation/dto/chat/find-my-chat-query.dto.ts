import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import {
  EnumChatContext,
  EnumChatType,
} from '../../../core/domain/entities/chat/chat.entity';

export class FindMyChatQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Текст сообщения',
    example: 'Hello World',
    required: false,
  })
  @Length(1, 100)
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Тип чата',
    example: EnumChatType.GROUP,
    required: false,
  })
  @IsEnum(EnumChatType)
  @IsString()
  @IsOptional()
  public type?: EnumChatType;

  @ApiProperty({
    description: 'Контекст чата',
    example: EnumChatContext.WORKSPACE,
    required: false,
  })
  @IsEnum(EnumChatContext)
  @IsString()
  @IsOptional()
  public context?: EnumChatContext;

  @ApiProperty({
    description:
      'Уникальный идентификатор контекстной сущности, например отклика.',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsString()
  @IsOptional()
  public contextId: string;

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
    description: 'Уникальный идентификатор отправителя сообщения',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public senderId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задачи',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsString()
  @IsOptional()
  public chatId?: string;
}
