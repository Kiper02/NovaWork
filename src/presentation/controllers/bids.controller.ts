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
import { CreateBidUseCase } from '../../core/use-cases/bid/create/create-bid.use-case';
import { UpdateBidUseCase } from '../../core/use-cases/bid/update/update-bid.use-case';
import { FindAllBidUseCase } from '../../core/use-cases/bid/find-all/find-all-bid.use-case';
import { FindByIdBidUseCase } from '../../core/use-cases/bid/find-by-id/find-by-id-bid.use-case';
import { BidResponseDto } from '../dto/bid/bid-response.dto';
import { CreateBidDto } from '../dto/bid/create-bid.dto';
import { BidMapper } from '../mappers/bid.mapper';
import { UpdateBidDto } from '../dto/bid/update-bid.dto';
import { BidPaginatedResponse } from '../dto/bid/bid-paginated-response';
import { FindAllBidQueryDto } from '../dto/bid/find-all-bid-query.dto';
import { FindMyBidQueryDto } from '../dto/bid/find-my-bid-query.dto';

@ApiTags('Bids')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('bids')
export class BidsController {
  public constructor(
    private readonly createBidUseCase: CreateBidUseCase,
    private readonly updateBidUseCase: UpdateBidUseCase,
    private readonly findAllBidUseCase: FindAllBidUseCase,
    private readonly findByIdBidUseCase: FindByIdBidUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новый отклик',
    description: 'Создает новый отклик',
  })
  @ApiResponse({
    status: 200,
    description: 'Отклик успешно создан',
    type: BidResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async create(
    @Body() dto: CreateBidDto,
    @Authorized('id') userId: string,
  ) {
    const command = BidMapper.toCreateCommand(userId, dto);
    const result = await this.createBidUseCase.execute(command);
    return BidMapper.toResponse(result);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить отклик',
    description: `Обновляет отклик`,
  })
  @ApiResponse({
    status: 200,
    description: 'Отклик успешно обновлен',
    type: BidResponseDto,
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
    @Body() dto: UpdateBidDto,
    @Authorized('id') userId: string,
    @Param() bidId: string,
  ) {
    const command = BidMapper.toUpdateCommand(
      bidId,
      userId,
      dto,
    );
    const result = await this.updateBidUseCase.execute(command);
    return BidMapper.toResponse(result);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все отклики',
    description: `Получает все отклики`,
  })
  @ApiResponse({
    status: 200,
    description: 'Отклики успешно получены',
    type: BidPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async findAll(@Query() queryDto: FindAllBidQueryDto) {
    const command = BidMapper.toFindAllCommand(queryDto);
    const paginatedResult = await this.findAllBidUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      BidMapper.toResponse,
    );
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить мои отклики',
    description: `Получает все отправленные или полученные отклики`,
  })
  @ApiResponse({
    status: 200,
    description: 'Отклики успешно получены',
    type: BidPaginatedResponse,
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
    @Query() queryDto: FindMyBidQueryDto,
  ) {
    const command = BidMapper.toFindMyCommand(userId, queryDto);
    const paginatedResult = await this.findAllBidUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      BidMapper.toResponse,
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить отклик по ID',
    description: `Получает отклик по идентификатору. Доступно для: отправителя/получателя пользователям с ролями ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Проект успешно получен',
    type: BidResponseDto,
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
    @Param() bidId: string,
  ) {
    const command = BidMapper.toFindByIdCommand(userId, bidId);
    const result = await this.findByIdBidUseCase.execute(command);
    return BidMapper.toResponse(result);
  }
}
