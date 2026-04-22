import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Put,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { GlobalRolesGuard } from '../guards/roles.guard';
import { Authorized } from '../decorators/authorized.decorator';
import {
  READ_RESOURCES,
} from '../../core/domain/constants/roles.constants';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { CreateChatUseCase } from '../../core/use-cases/chat/create/create-chat.use-case';
import { FindAllChatUseCase } from '../../core/use-cases/chat/find-all/find-all-chat.use-case';
import { FindMyChatUseCase } from '../../core/use-cases/chat/find-my/find-my-chat.use-case';
import { FindChatByIdUseCase } from '../../core/use-cases/chat/find-by-id/find-chat-by-id.use-case';
import { ChatResponseDto } from '../dto/chat/chat-response.dto';
import { StoragePort } from '../../core/ports/storage/storage.port';
import { CreateChatDto } from '../dto/chat/create-chat.dto';
import { ChatMapper } from '../mappers/chat.mapper';
import { UpdateChatDto } from '../dto/chat/update-chat.dto';
import { ChatUpdateUseCase } from '../../core/use-cases/chat/update/chat-update.use-case';
import { ChatPaginatedResponse } from '../dto/chat/chat-paginated-response';
import { FindMyChatQueryDto } from '../dto/chat/find-my-chat-query.dto';
import { Roles } from '../decorators/roles.decorator';
import { MyChatPaginatedResponse } from '../dto/chat/my-chat-paginated-response';


@ApiTags('Chats')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('chats')
export class ChatController {
  public constructor(
    private readonly storage: StoragePort,
    private readonly createChatUseCase: CreateChatUseCase,
    private readonly chatUpdateUseCase: ChatUpdateUseCase,
    private readonly findAllChatUseCase: FindAllChatUseCase,
    private readonly findMyChatUseCase: FindMyChatUseCase,
    private readonly findChatByIdUseCase: FindChatByIdUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новый чат',
    description: 'Создает новый чат',
  })
  @ApiResponse({
    status: 200,
    description: 'Чат успешно создан',
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
    @Body() dto: CreateChatDto,
    @Authorized('id') userId: string,
  ) {
    const command = ChatMapper.toCreateCommand(userId, dto);
    const result = await this.createChatUseCase.execute(command);
    return ChatMapper.toResponse(result);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить чат',
    description: `Обновляет чат`,
  })
  @ApiResponse({
    status: 200,
    description: 'Чат успешно обновлен',
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
  public async update(
    @Body() dto: UpdateChatDto,
    @Authorized('id') userId: string,
    @Param() chatId: string,
  ) {
    // TODO: Логика не реализована
    const command = ChatMapper.toUpdateCommand(chatId, userId, dto);
    const result = await this.chatUpdateUseCase.execute(command);
    return ChatMapper.toResponse(result);
  }

  @Get()
  @Roles(...READ_RESOURCES)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все чаты',
    description: `Получает все чаты. Доступно для: отправителя/получателя пользователям с ролями ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Чаты успешно получены',
    type: ChatPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async findAll(@Query() queryDto: FindMyChatQueryDto) {
    const command = ChatMapper.toFindAllCommand(queryDto);
    const paginatedResult = await this.findAllChatUseCase.execute(command);
    return PaginationFormatterUtil.formatAsync(
      paginatedResult,
      ChatMapper.toResponse,
    );
  }

  @Get('my')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить мои чаты',
    description: `Получает все чаты, в которых состоит пользователь`,
  })
  @ApiResponse({
    status: 200,
    description: 'Чаты успешно получены',
    type: MyChatPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async findMy(
    @Authorized('id') userId: string,
    @Query() queryDto: FindMyChatQueryDto,
  ) {
    const command = ChatMapper.toFindMyChats(userId, queryDto);
    const paginatedResult = await this.findMyChatUseCase.execute(command);
    return PaginationFormatterUtil.formatAsync(
      paginatedResult,
      entity => ChatMapper.toFindMyChatsResponse(entity, this.storage),
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить чат по ID',
    description: `Получает чат по идентификатору. Доступно для: участника чата и пользователям с ролями ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Чат успешно получен',
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
  public async findById(
    @Authorized('id') userId: string,
    @Param() chatId: string,
  ) {
    const command = ChatMapper.toFindChatByIdCommand(chatId, userId);
    const result = await this.findChatByIdUseCase.execute(command);
    return ChatMapper.toResponse(result);
  }
}
