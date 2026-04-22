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
  Delete,
  UseFilters,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Authorized } from '../decorators/authorized.decorator';
import { GlobalRolesGuard } from '../guards/roles.guard';
import { CreateBankDetailsUseCase } from '../../core/use-cases/payment/bank-details/create/create-bank-details.use-case';
import { BankDetailsMapper } from '../mappers/bank-details.mapper';
import { CreateBankDetailsDto } from '../dto/bank-details/create-bank-details.dto';
import { UpdateBankDetailsDto } from '../dto/bank-details/update-bank-details.dto';
import { FindAllBankDetailsQueryDto } from '../dto/bank-details/find-all-bank-details-query.dto';
import { BankDetailsResponseDto } from '../dto/bank-details/bank-details-response.dto';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { BankDetailsPaginatedResponse } from '../dto/bank-details/bank-details-paginated-response';
import {
  FindAllBankDetailsUseCase
} from '../../core/use-cases/payment/bank-details/find-all/find-all-bank-details.use-case';
import {
  FindBankDetailsByIdUseCase
} from '../../core/use-cases/payment/bank-details/find-by-id/find-bank-details-by-id.use-case';
import {
  UpdateBankDetailsUseCase
} from '../../core/use-cases/payment/bank-details/update/update-bank-details.use-case';
import {
  DeleteBankDetailsUseCase
} from '../../core/use-cases/payment/bank-details/delete/delete-bank-details.use-case';
import { use } from 'react';
import { BankDetailsNotFoundExceptionFilter } from '../filters/bank-details/bank-details-not-found-exception.filter';
import {
  FindMyBankDetailsUseCase
} from '../../core/use-cases/payment/bank-details/find-my/find-my-bank-details.use-case';

@ApiTags('Bank Details')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('bank-details')
export class BankDetailsController {
  constructor(
    private readonly createUseCase: CreateBankDetailsUseCase,
    private readonly findAllUseCase: FindAllBankDetailsUseCase,
    private readonly findByIdUseCase: FindBankDetailsByIdUseCase,
    private readonly updateUseCase: UpdateBankDetailsUseCase,
    private readonly deleteUseCase: DeleteBankDetailsUseCase,
    private readonly findMyUseCase: FindMyBankDetailsUseCase
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Добавить банковские реквизиты',
    description: 'Добавляет новые банковские реквизиты для бенефициара',
  })
  @ApiResponse({
    status: 200,
    description: 'Реквизиты успешно добавлены',
    type: BankDetailsResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  @ApiResponse({ status: 404, description: 'Бенефициар не найден' })
  async create(@Body() dto: CreateBankDetailsDto) {
    const command = BankDetailsMapper.toCreateCommand(dto);
    const entity = await this.createUseCase.execute(command);
    return BankDetailsMapper.toResponse(entity);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить список всех банковских реквизитов',
    description: 'Возвращает список реквизитов с пагинацией и фильтрацией',
  })
  @ApiResponse({
    status: 200,
    description: 'Список успешно получен',
    type: BankDetailsPaginatedResponse,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async findAll(@Query() query: FindAllBankDetailsQueryDto) {
    const command = BankDetailsMapper.toFindAllCommand(query);
    const paginatedResult = await this.findAllUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      BankDetailsMapper.toResponse,
    );
  }

  @Get('me')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить мои банковские реквизиты',
    description:
      'Возвращает список реквизитов текущего пользователя (через его бенефициара)',
  })
  @ApiResponse({
    status: 200,
    description: 'Список успешно получен',
    type: [BankDetailsResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Бенефициар не найден' })
  async findMy(@Authorized('id') userId: string) {
    const command = BankDetailsMapper.toFindMyCommand(userId);
    const entities = await this.findMyUseCase.execute(command);
    return entities.map(BankDetailsMapper.toResponse);
  }

  @Get(':id')
  @HttpCode(200)
  @UseFilters(BankDetailsNotFoundExceptionFilter)
  @ApiOperation({
    summary: 'Получить банковские реквизиты по ID',
    description: 'Возвращает детали реквизитов по идентификатору',
  })
  @ApiResponse({
    status: 200,
    description: 'Реквизиты успешно получены',
    type: BankDetailsResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  @ApiResponse({ status: 404, description: 'Реквизиты не найдены' })
  async findById(
    @Param('id') id: string,
    @Authorized('id') userId: string,
  ) {
    const command = BankDetailsMapper.toFindByIdCommand(userId, id);
    const entity = await this.findByIdUseCase.execute(command);
    return BankDetailsMapper.toResponse(entity);
  }

  @Put(':id')
  @HttpCode(200)
  @UseFilters(BankDetailsNotFoundExceptionFilter)
  @ApiOperation({
    summary: 'Обновить банковские реквизиты',
    description: 'Обновляет флаг isDefault для реквизитов',
  })
  @ApiResponse({
    status: 200,
    description: 'Реквизиты успешно обновлены',
    type: BankDetailsResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  @ApiResponse({ status: 404, description: 'Реквизиты не найдены' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBankDetailsDto,
    @Authorized('id') userId: string,
  ) {
    const command = BankDetailsMapper.toUpdateCommand(id, userId, dto);
    const entity = await this.updateUseCase.execute(command);
    return BankDetailsMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseFilters(BankDetailsNotFoundExceptionFilter)
  @ApiOperation({
    summary: 'Удалить банковские реквизиты',
    description: 'Удаляет реквизиты по идентификатору',
  })
  @ApiResponse({ status: 200, description: 'Реквизиты успешно удалены' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  @ApiResponse({ status: 404, description: 'Реквизиты не найдены' })
  async delete(@Param('id') id: string, @Authorized('id') userId: string) {
    const command = BankDetailsMapper.toDeleteCommand(id, userId);
    await this.deleteUseCase.execute(command);
    return { success: true };
  }
}
