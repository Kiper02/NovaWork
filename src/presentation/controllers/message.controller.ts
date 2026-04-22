import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Query,
  Get,
  UploadedFiles,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { GlobalRolesGuard } from '../guards/roles.guard';
import { Authorized } from '../decorators/authorized.decorator';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { CreateMessageUseCase } from '../../core/use-cases/message/create/create-message.use-case';
import { FindAllMessageUseCase } from '../../core/use-cases/message/find-all/find-all-message.use-case';
import { ChatResponseDto } from '../dto/chat/chat-response.dto';
import { CreateMessageDto } from '../dto/message/create-message.dto';
import { MessageMapper } from '../mappers/message.mapper';
import { StoragePort } from '../../core/ports/storage/storage.port';
import { MessageResponseDto } from '../dto/message/message-response.dto';
import { FindAllMessageQueryDto } from '../dto/message/find-all-message-query.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ChatForbiddenExceptionFilter } from '../filters/chat/chat-forbidden-exception.filter';


@ApiTags('Messages')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('messages')
export class MessageController {
  public constructor(
    private readonly storage: StoragePort,
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly findAllMessageUseCase: FindAllMessageUseCase,
  ) {}

  @Post()
  @UseFilters(ChatForbiddenExceptionFilter)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Создать новое сообщение',
    description: 'Создает новое сообщение и отправляет в сокет',
  })
  @ApiResponse({
    status: 200,
    description: 'Сообщение успешно создано',
    type: ChatResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async create(
    @Body() dto: CreateMessageDto,
    @Authorized('id') userId: string,
    @UploadedFiles() data: { files?: Express.Multer.File[] },
  ) {
    const command = MessageMapper.toCreateCommand(userId, dto, data.files);
    const result = await this.createMessageUseCase.execute(command);
    return MessageMapper.toResponse(result, this.storage);
  }

  @Get()
  @UseFilters(ChatForbiddenExceptionFilter)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все сообщения',
    description: `Получает все сообщения`,
  })
  @ApiResponse({
    status: 200,
    description: 'Сообщения успешно получены',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async findAll(
    @Query() queryDto: FindAllMessageQueryDto,
    @Authorized('id') userId: string,
  ) {
    const command = MessageMapper.toFindAllCommand(userId, queryDto);
    const paginatedResult = await this.findAllMessageUseCase.execute(command);
    return PaginationFormatterUtil.formatAsync(paginatedResult, (entity) =>
      MessageMapper.toResponse(entity, this.storage),
    );
  }
}
