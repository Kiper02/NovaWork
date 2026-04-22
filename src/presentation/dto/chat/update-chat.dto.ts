import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { EnumChatContext, EnumChatType } from '../../../core/domain/entities/chat/chat.entity';

export class UpdateChatDto {
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
    required: false
  })
  @IsEnum(EnumChatType)
  @IsString()
  @IsNotEmpty()
  public type?: EnumChatType;

  @ApiProperty({
    description:
      "Контекст чата. В случае если тип чата 'DIRECT' принимает значение 'null'",
    example: EnumChatContext.WORKSPACE,
    required: false,
  })
  @IsEnum(EnumChatContext)
  @IsString()
  @IsOptional()
  public context?: EnumChatContext;

  @ApiProperty({
    description:
      "Уникальный идентификатор контекстной сущности, например отклика. В случае если тип чата 'DIRECT' принимает значение 'null'",
    required: false
  })
  public contextId?: string;

  @ApiProperty({
    description: 'Id участников чата',
    example: ['04331c2d-c1d2-4e35-8ed7-6c5171cff845'],
    required: true,
  })
  @IsUUID(undefined, { each: true })
  @IsArray()
  @IsNotEmpty()
  public membersIds: string[];
}