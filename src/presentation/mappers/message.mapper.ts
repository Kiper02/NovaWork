import { CreateMessageDto } from '../dto/message/create-message.dto';
import { ICreateMessageCommand, IFileAttachment } from '../../core/use-cases/message/create/create-message.command';
import { IFindAllMessageCommand } from '../../core/use-cases/message/find-all/find-all-message.command';
import { FindAllMessageQueryDto } from '../dto/message/find-all-message-query.dto';
import { MessageEntity } from '../../core/domain/entities/chat/message.entity';
import { MessageResponseDto } from '../dto/message/message-response.dto';
import { StoragePort } from '../../core/ports/storage/storage.port';


export class MessageMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateMessageDto,
    files?: Express.Multer.File[],
  ): ICreateMessageCommand {
    let attachments: IFileAttachment[] = [];
    if(files?.length) {
     attachments = files.map((file) => {
       return {
         buffer: file.buffer,
         mimeType: file.mimetype,
       };
     });
    }
    return {
      text: dto.text,
      files: attachments,
      chatId: dto.chatId,
      senderId: userId,
    };
  }

  public static toFindAllCommand(
    userId: string,
    query: FindAllMessageQueryDto,
  ): IFindAllMessageCommand {
    return {
      senderId: query.senderId,
      userId: userId,
      chatId: query.chatId,
      text: query.text,
      createdAtStart: query.createdAtStart,
      createdAtEnd: query.createdAtEnd,
      page: query.page,
      limit: query.limit,
    };
  }

  public static async toResponse(
    entity: MessageEntity,
    storage: StoragePort,
  ): Promise<MessageResponseDto> {

    let filesUrls: string[] = []

    if(entity.files?.length) {
      filesUrls = await Promise.all(
        entity.files.map(async (file) => storage.get(file)),
      );
    }

    return {
      id: entity.id,
      senderId: entity.senderId,
      text: entity.text || null,
      files: filesUrls,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
