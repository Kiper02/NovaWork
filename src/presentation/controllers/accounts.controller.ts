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
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Roles } from '../decorators/roles.decorator';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { CreateAccountUseCase } from '../../core/use-cases/account/create-account/create-account.use-case';
import { AccountMapper } from '../mappers/account.mapper';
import { CreateAccountDto } from '../dto/account/create-account.dto';
import { UpdateAccountUseCase } from '../../core/use-cases/account/update/update-account.use-case';
import { FindAllAccountUseCase } from '../../core/use-cases/account/find-all/find-all-account.use-case';
import { FindMyAccountUseCase } from '../../core/use-cases/account/find-my/find-my-account.use-case';
import { AccountResponseDto } from '../dto/account/account-response.dto';
import { UpdateAccountDto } from '../dto/account/update-account.dto';
import { FindAllAccountQueryDto } from '../dto/account/find-all-account-query.dto';
import { AccountPaginatedResponse } from '../dto/account/account-paginated-response';
import { Authorized } from '../decorators/authorized.decorator';
import { AccountNotFoundExceptionFilter } from '../filters/account/account-not-found-exception.filter';
import { UserNotFoundExceptionFilter } from '../filters/user/user-not-found-exception.filter';
import { GlobalRolesGuard } from '../guards/roles.guard';
import {
  READ_RESOURCES,
  UPDATE_RESOURCES,
} from '../../core/domain/constants/roles.constants';

@ApiTags('Account')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly updateAccountUseCase: UpdateAccountUseCase,
    private readonly findAllAccountUseCase: FindAllAccountUseCase,
    private readonly findMyAccountUseCase: FindMyAccountUseCase,
  ) {}

  @UseFilters(UserNotFoundExceptionFilter)
  @Roles(...UPDATE_RESOURCES)
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новый аккаунт',
    description: `Создает новый аккаунт. Доступно для: ${UPDATE_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Аккаунт успешно создан',
    type: AccountResponseDto,
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
    description: 'Пользователь не найден',
  })
  public async create(@Body() dto: CreateAccountDto) {
    const command = AccountMapper.toCreateCommand(dto);
    const account = await this.createAccountUseCase.execute(command);
    return AccountMapper.toResponse(account);
  }

  @Roles(...UPDATE_RESOURCES)
  @Auth()
  @Put()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить аккаунт',
    description: `Обновляет аккаунт. Доступно для: ${UPDATE_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Аккаунт успешно обновлён',
    type: AccountResponseDto,
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
    description: 'Аккаунт не найден',
  })
  public async update(@Body() dto: UpdateAccountDto) {
    const command = AccountMapper.toUpdateCommand(dto);
    const profile = await this.updateAccountUseCase.execute(command);
    return AccountMapper.toResponse(profile);
  }

  @Roles(...READ_RESOURCES)
  @Auth()
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все аккаунты',
    description: `Получает все аккаунты платформы. Доступно для: ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Аккаунты успешно получены',
    type: AccountPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async findAll(@Query() query: FindAllAccountQueryDto) {
    const command = AccountMapper.toFindAllCommand(query);
    const paginatedResult = await this.findAllAccountUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      AccountMapper.toResponse,
    );
  }

  @Auth()
  @Get('my')
  @HttpCode(200)
  @UseFilters(AccountNotFoundExceptionFilter)
  @ApiOperation({
    summary: 'Получить мой аккаунт',
    description: 'Получает аккаунт текущего пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Аккаунт успешно получен',
    type: AccountPaginatedResponse,
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
    description: 'Аккаунт не найден',
  })
  public async findMy(@Authorized('id') userId: string) {
    const command = AccountMapper.toFindMyCommand(userId);
    const account = await this.findMyAccountUseCase.execute(command);
    return AccountMapper.toResponse(account);
  }
}
