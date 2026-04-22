import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  UploadedFile,
  Put,
  Param,
  Query,
  Get,
  UseInterceptors,
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
import { ProjectResponseDto } from '../dto/project/project-response.dto';
import { CreateProjectUseCase } from '../../core/use-cases/project/create/create-project.use-case';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import { Authorized } from '../decorators/authorized.decorator';
import { ProjectMapper } from '../mappers/project.mapper';
import {
  READ_RESOURCES,
  UPDATE_RESOURCES,
} from '../../core/domain/constants/roles.constants';
import { UpdateProjectUseCase } from '../../core/use-cases/project/update/update-project.use-case';
import { FindAllProjectUseCase } from '../../core/use-cases/project/find-all/find-all-project.use-case';
import { FindByIdProjectUseCase } from '../../core/use-cases/project/find-by-id/find-by-id-project.use-case';
import { FindAllProjectQueryDto } from '../dto/project/find-all-project-query.dto';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { Roles } from '../decorators/roles.decorator';
import { ProjectPaginatedResponse } from '../dto/project/project-paginated-response';
import { FindMyProjectQueryDto } from '../dto/project/find-my-project-query.dto';
import { StoragePort } from '../../core/ports/storage/storage.port';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Projects')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('projects')
export class ProjectsController {
  public constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly findAllProjectUseCase: FindAllProjectUseCase,
    private readonly findByIdProjectUseCase: FindByIdProjectUseCase,
    private readonly storage: StoragePort,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Создать новый проект',
    description: 'Создает новый проект',
  })
  @ApiResponse({
    status: 200,
    description: 'Проект успешно создан',
    type: ProjectResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async create(
    @Body() dto: CreateProjectDto,
    @Authorized('id') userId: string,
    @UploadedFile() picture?: Express.Multer.File,
  ) {
    const command = ProjectMapper.toCreateCommand(userId, dto, picture);
    const result = await this.createProjectUseCase.execute(command);
    return ProjectMapper.toResponse(result, this.storage);
  }

  @Roles(...UPDATE_RESOURCES)
  @Put(':id')
  @UseInterceptors(FileInterceptor('picture'))
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Обновить проект',
    description: `Обновляет проект. Доступно для: владельца проекта и пользователям с ролями ${UPDATE_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Проект успешно обновлен',
    type: ProjectResponseDto,
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
    @Body() dto: UpdateProjectDto,
    @Authorized('id') userId: string,
    @Param() projectId: string,
    @UploadedFile() picture?: Express.Multer.File,
  ) {
    const command = ProjectMapper.toUpdateCommand(
      projectId,
      userId,
      dto,
      picture,
    );
    const result = await this.updateProjectUseCase.execute(command);
    return ProjectMapper.toResponse(result, this.storage);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все проекты',
    description: `Получает все проекты`,
  })
  @ApiResponse({
    status: 200,
    description: 'Проекты успешно получены',
    type: ProjectPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async findAll(@Query() queryDto: FindAllProjectQueryDto) {
    // TODO: Реализовать проверку, если у пользователя включена видимость проектов для других, то можно показывать

    const command = ProjectMapper.toFindAllCommand(queryDto);
    const paginatedResult = await this.findAllProjectUseCase.execute(command);
    return PaginationFormatterUtil.formatAsync(paginatedResult, (entity) =>
      ProjectMapper.toResponse(entity, this.storage),
    );
  }

  @Get('my')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все проекты',
    description: `Получает все проекты, в которых участвует пользователь`,
  })
  @ApiResponse({
    status: 200,
    description: 'Проект успешно обновлен',
    type: ProjectPaginatedResponse,
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
    @Query() queryDto: FindMyProjectQueryDto,
  ) {
    // TODO: Необходимо создать другой кейс, так как нужно будет проверять принадлежность пользователя к проекту

    const command = ProjectMapper.toFindMyCommand(userId, queryDto);
    const paginatedResult = await this.findAllProjectUseCase.execute(command);
    return PaginationFormatterUtil.formatAsync(paginatedResult, (entity) =>
      ProjectMapper.toResponse(entity, this.storage),
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить проект по ID',
    description: `Получает проект по идентификатору. Доступно для: участника проекта и пользователям с ролями ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Проект успешно обновлен',
    type: ProjectResponseDto,
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
    @Param() projectId: string,
  ) {
    const command = ProjectMapper.toFindByIdCommand(userId, projectId);
    const result = await this.findByIdProjectUseCase.execute(command);
    return ProjectMapper.toResponse(result, this.storage);
  }
}
