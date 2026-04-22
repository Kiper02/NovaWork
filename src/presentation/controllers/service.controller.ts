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
  UseFilters,
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
import { Roles } from '../decorators/roles.decorator';
import { READ_RESOURCES } from '../../core/domain/constants/roles.constants';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { FindServiceByIdUseCase } from '../../core/use-cases/service/find-by-id/find-service-by-id.use-case';
import { CreateServiceDto } from '../dto/service/create-service.dto';
import { UpdateServiceDto } from '../dto/service/update-service.dto';
import { FindAllServiceQueryDto } from '../dto/service/find-all-service-query.dto';
import { ServiceMapper } from '../mappers/service.mapper';
import { ServiceResponseDto } from '../dto/service/service-response.dto';
import { CreateServiceUseCase } from '../../core/use-cases/service/create/create-service.use-case';
import { ServiceUpdateUseCase } from '../../core/use-cases/service/update/service-update.use-case';
import { FindAllServiceUseCase } from '../../core/use-cases/service/find-all/find-all-service.use-case';
import { ServicePaginatedResponse } from '../dto/service/service-paginated-response';
import { FindMyServiceQueryDto } from '../dto/service/find-my-service-query.dto';
import { WorkspaceNotFoundExceptionFilter } from '../filters/workspace/workspace-not-found-exception.filter';
import { ServiceForDetailsPaginatedResponse } from '../dto/service/service-for-details-paginated-response';
import { ServiceResponseForDetailsDto } from '../dto/service/service-response-for-details.dto';
import { StoragePort } from '../../core/ports/storage/storage.port';

@ApiTags('Services')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('services')
export class ServiceController {
  public constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly updateServiceUseCase: ServiceUpdateUseCase,
    private readonly findAllServiceUseCase: FindAllServiceUseCase,
    private readonly findServiceByIdUseCase: FindServiceByIdUseCase,
    private readonly storage: StoragePort
  ) {}

  @Post()
  @UseFilters(WorkspaceNotFoundExceptionFilter)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новую услугу',
    description: 'Создаёт новую услугу (магазин услуг)',
  })
  @ApiResponse({
    status: 200,
    description: 'Услуга успешно создана',
    type: ServiceResponseDto,
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
    @Body() dto: CreateServiceDto,
    @Authorized('id') userId: string,
  ) {
    const command = ServiceMapper.toCreateCommand(userId, dto);
    const result = await this.createServiceUseCase.execute(command);
    return ServiceMapper.toResponse(result);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить услугу',
    description: 'Обновляет параметры услуги',
  })
  @ApiResponse({
    status: 200,
    description: 'Услуга успешно обновлена',
    type: ServiceResponseDto,
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
    @Param('id') serviceId: string,
    @Authorized('id') userId: string,
    @Body() dto: UpdateServiceDto,
  ) {
    const command = ServiceMapper.toUpdateCommand(serviceId, userId, dto);
    const result = await this.updateServiceUseCase.execute(command);
    return ServiceMapper.toResponse(result);
  }

  @Get()
  @Roles(...READ_RESOURCES)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все услуги',
    description: `Получает все услуги с фильтрацией. Доступно для ролей: ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Услуги успешно получены',
    type: ServiceForDetailsPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async findAll(@Query() queryDto: FindAllServiceQueryDto) {
    const command = ServiceMapper.toFindAllCommand(queryDto);
    const paginatedResult = await this.findAllServiceUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      (entity) => ServiceMapper.toResponseForDetails(entity, this.storage),
    );
  }

  @Get('my')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить мои услуги',
    description: 'Получает услуги, созданные текущим пользователем',
  })
  @ApiResponse({
    status: 200,
    description: 'Услуги успешно получены',
    type: ServiceForDetailsPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async findMy(
    @Authorized('id') userId: string,
    @Query() queryDto: FindMyServiceQueryDto,
  ) {
    const command = ServiceMapper.toFindMyCommand(userId, queryDto);
    const paginatedResult = await this.findAllServiceUseCase.execute(command);
    return PaginationFormatterUtil.formatAsync(
      paginatedResult,
      (entity) => ServiceMapper.toResponseForDetails(entity, this.storage),
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить услугу по ID',
    description:
      'Получает услугу по идентификатору. Доступно всем авторизованным пользователям',
  })
  @ApiResponse({
    status: 200,
    description: 'Услуга успешно получена',
    type: ServiceResponseForDetailsDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async findById(@Param('id') serviceId: string) {
    const command = ServiceMapper.toFindByIdCommand(serviceId);
    const result = await this.findServiceByIdUseCase.execute(command);
    return ServiceMapper.toResponseForDetails(result, this.storage);
  }
}
