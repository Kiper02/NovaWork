import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskUseCase } from '../../core/use-cases/task/create/create-task.use-case';
import { FindAllTaskUseCase } from '../../core/use-cases/task/find-all/find-all-task.use-case';
import { FindTaskByIdUseCase } from '../../core/use-cases/task/find-by-id/find-task-by-id.use-case';
import { TaskUpdateUseCase } from '../../core/use-cases/task/update/task-update.use-case';
import { TaskResponseDto } from '../dto/task/task-response.dto';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { TaskMapper } from '../mappers/task.mapper';
import { Authorized } from '../decorators/authorized.decorator';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { Roles } from '../decorators/roles.decorator';
import { FindAllTaskQueryDto } from '../dto/task/find-all-task-query.dto';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { TaskNotFoundExceptionFilter } from '../filters/task/task-not-found-exception.filter';
import { TaskForbiddenExceptionFilter } from '../filters/task/task-forbidden-exception.filter';
import { GlobalRolesGuard } from '../guards/roles.guard';
import {
  READ_RESOURCES,
  UPDATE_RESOURCES,
} from '../../core/domain/constants/roles.constants';
import { TaskForDetailsPaginatedResponse } from '../dto/task/task-for-details-paginated-response';
import { TaskResponseForDetailsDto } from '../dto/task/task-response-for-details.dto';
import { StoragePort } from '../../core/ports/storage/storage.port';


@ApiTags('Tasks')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly taskUpdateUseCase: TaskUpdateUseCase,
    private readonly findAllTaskUseCase: FindAllTaskUseCase,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
    private readonly storage: StoragePort
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать задачу',
    description: 'Создает задачу',
  })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно создана',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Неверные параметры запрос',
  })
  public async create(
    @Body() dto: CreateTaskDto,
    @Authorized('id') userId: string,
  ) {
    const command = TaskMapper.toCreateCommand(userId, dto);
    const account = await this.createTaskUseCase.execute(command);
    return TaskMapper.toResponse(account);
  }

  @UseFilters(TaskNotFoundExceptionFilter, TaskForbiddenExceptionFilter)
  @Roles(...UPDATE_RESOURCES)
  @Auth()
  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить задачу',
    description:
      `Обновляет задачу. Доступно для: владельца задачи и пользователям с ролями ${UPDATE_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно обновлена',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  @ApiResponse({
    status: 404,
    description: 'Задача не найдена',
  })
  public async update(
    @Body() dto: UpdateTaskDto,
    @Param('id') id: string,
    @Authorized('id') userId: string,
  ) {
    const command = TaskMapper.toUpdateCommand(id, userId, dto);
    const task = await this.taskUpdateUseCase.execute(command);
    return TaskMapper.toResponse(task);
  }

  @Auth()
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все задачи платформы',
    description:
      `Получает все задачи платформы`,
  })
  @ApiResponse({
    status: 200,
    description: 'Задачи успешно получены',
    type: TaskForDetailsPaginatedResponse,
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
    @Query() query: FindAllTaskQueryDto,
    @Authorized('id') userId: string,
  ) {
    const command = TaskMapper.toFindAllCommand(query, userId);
    const paginatedResult = await this.findAllTaskUseCase.execute(command);
    return PaginationFormatterUtil.formatAsync(
      paginatedResult,
      (entity) => TaskMapper.toResponseForDetails(entity, this.storage),
    );
  }

  @Auth()
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить задачу',
    description: 'Получает задачу по идентификатору',
  })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно получена',
    type: TaskResponseForDetailsDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Задача не найдена',
  })
  public async findById(
    @Param('id') id: string,
    @Authorized('id') userId: string,
  ) {
    const command = TaskMapper.toFindByIdCommand(id, userId);
    const result = await this.findTaskByIdUseCase.execute(command);
    return TaskMapper.toResponseForDetails(result, this.storage);
  }
}
