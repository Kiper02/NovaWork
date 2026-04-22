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
import { Roles } from '../decorators/roles.decorator';
import { READ_RESOURCES } from '../../core/domain/constants/roles.constants';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { FindAllContractUseCase } from '../../core/use-cases/contract/find-all/find-all-contract.use-case';
import { CreateContractDto } from '../dto/contract/create-contract.dto';
import { UpdateContractDto } from '../dto/contract/update-contract.dto';
import { FindAllContractQueryDto } from '../dto/contract/find-all-contract-query.dto';
import { ContractMapper } from '../mappers/contract.mapper';
import { ContractResponseDto } from '../dto/contract/contract-response.dto';
import { CreateContractUseCase } from '../../core/use-cases/contract/create/create-contract.use-case';
import { UpdateContractUseCase } from '../../core/use-cases/contract/update/update-contract.use-case';
import { FindByIdContractUseCase } from '../../core/use-cases/contract/find-by-id/find-by-id-contract.use-case';
import { ContractPaginatedResponse } from '../dto/contract/contract-paginated-response';
import { FindMyContractQueryDto } from '../dto/contract/find-my-contract-query.dto';

@ApiTags('Contracts')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('contracts')
export class ContractController {
  public constructor(
    private readonly createContractUseCase: CreateContractUseCase,
    private readonly updateContractUseCase: UpdateContractUseCase,
    private readonly findAllContractUseCase: FindAllContractUseCase,
    private readonly findByIdContractUseCase: FindByIdContractUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новый контракт',
    description: 'Создаёт новый контракт между заказчиком и исполнителем',
  })
  @ApiResponse({
    status: 200,
    description: 'Контракт успешно создан',
    type: ContractResponseDto,
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
    @Body() dto: CreateContractDto,
    @Authorized('id') userId: string,
  ) {
    const command = ContractMapper.toCreateCommand(userId, dto);
    const result = await this.createContractUseCase.execute(command);
    return ContractMapper.toResponse(result);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить контракт',
    description: 'Обновляет параметры контракта (сумму, статус, согласия)',
  })
  @ApiResponse({
    status: 200,
    description: 'Контракт успешно обновлён',
    type: ContractResponseDto,
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
    @Param('id') contractId: string,
    @Authorized('id') userId: string,
    @Body() dto: UpdateContractDto,
  ) {
    const command = ContractMapper.toUpdateCommand(contractId, userId, dto);
    const result = await this.updateContractUseCase.execute(command);
    return ContractMapper.toResponse(result);
  }

  @Get()
  @Roles(...READ_RESOURCES)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все контракты',
    description: `Получает все контракты с фильтрацией. Доступно для ролей: ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Контракты успешно получены',
    type: ContractPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async findAll(@Query() queryDto: FindAllContractQueryDto) {
    const command = ContractMapper.toFindAllCommand(queryDto);
    const paginatedResult = await this.findAllContractUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      ContractMapper.toResponse,
    );
  }

  @Get('my')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить мои контракты',
    description:
      'Получает контракты, где пользователь является заказчиком или исполнителем',
  })
  @ApiResponse({
    status: 200,
    description: 'Контракты успешно получены',
    type: ContractPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async findMy(
    @Authorized('id') userId: string,
    @Query() queryDto: FindMyContractQueryDto,
  ) {
    const command = ContractMapper.toFindMyCommand(userId, queryDto);
    const paginatedResult = await this.findAllContractUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      ContractMapper.toResponse,
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить контракт по ID',
    description:
      'Получает контракт по идентификатору. Доступно для участников контракта или администраторов',
  })
  @ApiResponse({
    status: 200,
    description: 'Контракт успешно получен',
    type: ContractResponseDto,
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
    @Param('id') contractId: string,
    @Authorized('id') userId: string,
  ) {
    const command = ContractMapper.toFindByIdCommand(contractId, userId);
    const result = await this.findByIdContractUseCase.execute(command);
    return ContractMapper.toResponse(result);
  }
}
