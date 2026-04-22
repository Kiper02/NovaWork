import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkspaceResponseDto } from '../dto/workspace/workspace-response.dto';
import { CreateWorkspaceUseCase } from '../../core/use-cases/workspace/create-workspace/create-workspace.use-case';
import { Auth } from '../decorators/auth.decorator';
import { Authorized } from '../decorators/authorized.decorator';
import { WorkspaceMapper } from '../mappers/workspace.mapper';
import { CreateWorkspaceDto } from '../dto/workspace/create-workspace.dto';
import { FindAllWorkspaceUseCase } from '../../core/use-cases/workspace/find-all-workspace/find-all-workspace.use-case';
import { FindAllWorkspaceQueryDto } from '../dto/workspace/find-all-workspace-query.dto';
import { BaseQueryDto } from '../dto/shared/base-query.dto';
import { FindMyWorkspaceUseCase } from '../../core/use-cases/workspace/find-my-workspace/find-my-workspace.use-case';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { Roles } from '../decorators/roles.decorator';
import { WorkspacePaginatedResponseDto } from '../dto/workspace/workspace-paginated-response.dto';
import { GlobalRolesGuard } from '../guards/roles.guard';
import { READ_RESOURCES } from '../../core/domain/constants/roles.constants';

@ApiTags('Workspaces')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('workspaces')
export class WorkspacesController {
  constructor(
    private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,
    private readonly findAllWorkspaceUseCase: FindAllWorkspaceUseCase,
    private readonly findMyWorkspaceUseCase: FindMyWorkspaceUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новое рабочее пространство',
    description: 'Создает новое рабочее пространство',
  })
  @ApiResponse({
    status: 200,
    description: 'Рабочее пространство успешно создан',
    type: WorkspaceResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Неверные параметры запроса',
  })
  public async create(
    @Body() dto: CreateWorkspaceDto,
    @Authorized('id') userId: string,
  ) {
    const command = WorkspaceMapper.toCreateCommand(dto, userId);
    const user = await this.createWorkspaceUseCase.execute(command);
    return WorkspaceMapper.toResponse(user);
  }

  @Roles(...READ_RESOURCES)
  @Get('')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все рабочие пространства платформы',
    description:
      `Получает все рабочие пространства платформы. Доступно для: ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Рабочие пространства получены',
    type: WorkspacePaginatedResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  @ApiResponse({
    status: 404,
    description: 'Неверные параметры запроса',
  })
  public async findAll(
    @Query() query: FindAllWorkspaceQueryDto,
    @Authorized('id') userId: string,
  ) {
    const command = WorkspaceMapper.toFindAllCommand(query);
    const paginatedResult = await this.findAllWorkspaceUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      WorkspaceMapper.toResponse,
    );
  }

  @Get('my')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить пространства пользователя',
    description: 'Получает все рабочие пространства текущего пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Рабочие пространства получены',
    type: WorkspacePaginatedResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  @ApiResponse({
    status: 404,
    description: 'Неверные параметры запроса',
  })
  public async findMy(
    @Query() params: BaseQueryDto,
    @Authorized('id') userId: string,
  ) {
    const command = WorkspaceMapper.toFindMyCommand(params, userId);
    const paginatedResult = await this.findMyWorkspaceUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      WorkspaceMapper.toResponse,
    );
  }
}
