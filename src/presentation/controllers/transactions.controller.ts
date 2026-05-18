import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Put,
  UseFilters,
  HttpCode,
  UseGuards,
  Param,
  Delete,
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
import { CreateTransactionUseCase } from '../../core/use-cases/transaction/create/create-transaction.use-case';
import { UpdateTransactionUseCase } from '../../core/use-cases/transaction/update/update-transaction.use-case';
import { FindAllTransactionUseCase } from '../../core/use-cases/transaction/find-all/find-all-transaction.use-case';
import { FindMyTransactionsUseCase } from '../../core/use-cases/transaction/find-my/find-my-transactions.use-case';
import { FindByIdTransactionUseCase } from '../../core/use-cases/transaction/find-by-id/find-by-id-transaction.use-case';
import { DeleteTransactionUseCase } from '../../core/use-cases/transaction/delete/delete-transaction.use-case';
import { GetStatisticsUseCase } from '../../core/use-cases/transaction/get-statistics/get-statistics.use-case';
import { TransactionMapper } from '../mappers/transaction.mapper';
import { CreateTransactionDto } from '../dto/transaction/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/transaction/update-transaction.dto';
import { FindAllTransactionQueryDto } from '../dto/transaction/find-all-transaction-query.dto';
import { StatisticsQueryDto } from '../dto/transaction/statistics-query.dto';
import { TransactionResponseDto } from '../dto/transaction/transaction-response.dto';
import { TransactionPaginatedResponse } from '../dto/transaction/transaction-paginated-response';
import { StatisticsResponseDto } from '../dto/finance/statistics-response.dto';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { TransactionNotFoundExceptionFilter } from '../filters/transaction/transaction-not-found-exception.filter';
import { AccountRepository } from '../../core/domain/repositories/finance/account.repository';

@ApiTags('Transactions')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
    private readonly findAllTransactionUseCase: FindAllTransactionUseCase,
    private readonly findMyTransactionsUseCase: FindMyTransactionsUseCase,
    private readonly findByIdTransactionUseCase: FindByIdTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
    private readonly getStatisticsUseCase: GetStatisticsUseCase,
    private readonly accountRepository: AccountRepository,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новую транзакцию',
    description: 'Создает новую транзакцию для аккаунта пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Транзакция успешно создана',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  @ApiResponse({ status: 404, description: 'Аккаунт не найден' })
  public async create(
    @Body() dto: CreateTransactionDto,
    @Authorized('id') userId: string,
  ) {
    const account = await this.accountRepository.findByUserId(userId);
    if (!account) {
      throw new Error('Account not found');
    }
    const command = TransactionMapper.toCreateCommand(dto, account.id);
    const transaction = await this.createTransactionUseCase.execute(command);
    return TransactionMapper.toResponse(transaction);
  }

  @Put(':id')
  @HttpCode(200)
  @UseFilters(TransactionNotFoundExceptionFilter)
  @ApiOperation({
    summary: 'Обновить транзакцию',
    description: 'Обновляет данные транзакции',
  })
  @ApiResponse({
    status: 200,
    description: 'Транзакция успешно обновлена',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  @ApiResponse({ status: 404, description: 'Транзакция не найдена' })
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
    @Authorized('id') userId: string,
  ) {
    const command = TransactionMapper.toUpdateCommand(id, dto);
    const transaction = await this.updateTransactionUseCase.execute(command);
    return TransactionMapper.toResponse(transaction);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все транзакции',
    description: 'Получает все транзакции платформы с пагинацией',
  })
  @ApiResponse({
    status: 200,
    description: 'Транзакции успешно получены',
    type: TransactionPaginatedResponse,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  public async findAll(@Query() query: FindAllTransactionQueryDto) {
    const command = TransactionMapper.toFindAllCommand(query);
    const paginatedResult = await this.findAllTransactionUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      TransactionMapper.toResponse,
    );
  }

  @Get('my')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить мои транзакции',
    description: 'Получает транзакции текущего пользователя с пагинацией',
  })
  @ApiResponse({
    status: 200,
    description: 'Транзакции успешно получены',
    type: TransactionPaginatedResponse,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Аккаунт не найден' })
  public async findMy(
    @Query() query: FindAllTransactionQueryDto,
    @Authorized('id') userId: string,
  ) {
    const command = TransactionMapper.toFindMyCommand(userId, query);
    const paginatedResult = await this.findMyTransactionsUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      TransactionMapper.toResponse,
    );
  }

  @Get('statistics')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить статистику по транзакциям',
    description: 'Возвращает статистику доходов и расходов за период',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика успешно получена',
    type: StatisticsResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Аккаунт не найден' })
  public async getStatistics(
    @Query() query: StatisticsQueryDto,
    @Authorized('id') userId: string,
  ) {
    const account = await this.accountRepository.findByUserId(userId);
    if (!account) {
      throw new Error('Account not found');
    }
    const command = TransactionMapper.toStatisticsCommand(userId, query);
    const stats = await this.getStatisticsUseCase.execute(command);
    return TransactionMapper.toStatisticsResponse(stats);
  }

  @Get(':id')
  @HttpCode(200)
  @UseFilters(TransactionNotFoundExceptionFilter)
  @ApiOperation({
    summary: 'Получить транзакцию по ID',
    description: 'Возвращает детали транзакции по идентификатору',
  })
  @ApiResponse({
    status: 200,
    description: 'Транзакция успешно получена',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  @ApiResponse({ status: 404, description: 'Транзакция не найдена' })
  public async findById(
    @Param('id') id: string,
    @Authorized('id') userId: string,
  ) {
    const command = { transactionId: id, userId: userId };
    const transaction = await this.findByIdTransactionUseCase.execute(command);
    return TransactionMapper.toResponse(transaction);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseFilters(TransactionNotFoundExceptionFilter)
  @ApiOperation({
    summary: 'Удалить транзакцию',
    description: 'Удаляет транзакцию по идентификатору',
  })
  @ApiResponse({ status: 200, description: 'Транзакция успешно удалена' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  @ApiResponse({ status: 404, description: 'Транзакция не найдена' })
  public async delete(
    @Param('id') id: string,
    @Authorized('id') userId: string,
  ) {
    const command = { transactionId: id, userId: userId };
    await this.deleteTransactionUseCase.execute(command);
    return { success: true };
  }
}
