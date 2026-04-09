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
  Get, HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
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
import { TaskPaginatedResponse } from '../dto/task/task-paginated-response';
import { Roles } from '../decorators/roles.decorator';
import { FindAllTaskQueryDto } from '../dto/task/find-all-task-query.dto';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { TaskNotFoundExceptionFilter } from '../filters/task/task-not-found-exception.filter';
import { TaskForbiddenExceptionFilter } from '../filters/task/task-forbidden-exception.filter';


@ApiTags('Tasks')
@ApiCookieAuth()
@Auth()
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly taskUpdateUseCase: TaskUpdateUseCase,
    private readonly findAllTaskUseCase: FindAllTaskUseCase,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
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
  @Auth()
  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить задачу',
    description:
      'Обновляет задачу. Доступно для: владельца задачи и пользователям с ролями super_admin, admin, moderator',
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
    const profile = await this.taskUpdateUseCase.execute(command);
    return TaskMapper.toResponse(profile);
  }

  @Roles('super_admin', 'admin', 'moderator', 'support')
  @Auth()
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все задачи платформы',
    description:
      'Получает все задачи платформы. Доступно для: super_admin, admin, moderator, support',
  })
  @ApiResponse({
    status: 200,
    description: 'Задачи успешно получены',
    type: TaskPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async findAll(@Query() query: FindAllTaskQueryDto) {
    const command = TaskMapper.toFindAllCommand(query);
    const paginatedResult = await this.findAllTaskUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      TaskMapper.toResponse,
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
    type: TaskPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Задача не найдена',
  })
  public async findById(@Param('id') id: string) {
    const command = TaskMapper.toFindByIdCommand(id);
    const result = await this.findTaskByIdUseCase.execute(command);
    return TaskMapper.toResponse(result);
  }
}
