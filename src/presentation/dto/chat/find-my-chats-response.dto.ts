import { ApiProperty } from '@nestjs/swagger';
import {
  EnumChatContext,
  EnumChatType,
} from '../../../core/domain/entities/chat/chat.entity';
import { ChatMemberDto } from './chat-member.dto';
import { ChatBlock } from '../../../core/domain/value-objects/chat/chat-block.value-object';
import { ChatBlockDto } from './chat-block.dto';
import { ParticipantChatDto } from './participant-chat.dto';
import { LastMessageDto } from './last-message.dto';

export class FindMyChatsResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор чата',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Название чата',
    example: 'Тестовый чат',
  })
  public title: string;

  @ApiProperty({
    description: 'Тип чата',
    example: EnumChatType.GROUP,
  })
  public type: EnumChatType;

  @ApiProperty({
    description:
      "Контекст чата. В случае если тип чата 'DIRECT' принимает значение 'null'",
    example: EnumChatContext.WORKSPACE,
    required: false,
  })
  public context: EnumChatContext | null;

  @ApiProperty({
    description:
      "Уникальный идентификатор контекстной сущности, например отклика. В случае если тип чата 'DIRECT' принимает значение 'null'",
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public contextId: string | null;

  @ApiProperty({
    description: 'Участники чата',
    example: [ChatMemberDto],
  })
  public participants: ParticipantChatDto[];

  @ApiProperty({
    description: 'Последнее сообщение',
    example: LastMessageDto,
    required: false,
  })
  public lastMessage: LastMessageDto | null

  @ApiProperty({
    description: 'Если заблокирован чат',
    example: ChatBlockDto,
  })
  block: ChatBlock | null;

  @ApiProperty({
    description: 'Дата создания',
    example: '2024-01-15T12:30:00.000Z',
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Дата последнего обновления',
    example: '2024-01-15T12:30:00.000Z',
  })
  public updatedAt: Date;
}
