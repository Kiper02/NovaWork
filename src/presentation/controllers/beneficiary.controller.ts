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
import { CreateBeneficiaryUseCase } from '../../core/use-cases/payment/beneficiary/create/create-beneficiary.use-case';
import { UpdateBeneficiaryUseCase } from '../../core/use-cases/payment/beneficiary/update/update-beneficiary.use-case';
import { FindAllBeneficiaryUseCase } from '../../core/use-cases/payment/beneficiary/find-all/find-all-beneficiary.use-case';
import { FindBeneficiaryByUserIdUseCase } from '../../core/use-cases/payment/beneficiary/find-by-user-id/find-beneficiary-by-user-id.use-case';
import { RemoveBeneficiaryUseCase } from '../../core/use-cases/payment/beneficiary/remove/remove-beneficiary.use-case';
import { CreateBeneficiaryDto } from '../dto/beneficiary/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from '../dto/beneficiary/update-beneficiary.dto';
import { FindAllBeneficiaryQueryDto } from '../dto/beneficiary/find-all-beneficiary-query.dto';
import { BeneficiaryResponseDto } from '../dto/beneficiary/beneficiary-response.dto';
import { BeneficiaryMapper } from '../mappers/beneficiary.mapper';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { BeneficiaryPaginatedResponse } from '../dto/beneficiary/beneficiary-paginated-response';

@ApiTags('Beneficiary')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('beneficiary')
export class BeneficiaryController {
  public constructor(
    private readonly createBeneficiaryUseCase: CreateBeneficiaryUseCase,
    private readonly updateBeneficiaryUseCase: UpdateBeneficiaryUseCase,
    private readonly findAllBeneficiaryUseCase: FindAllBeneficiaryUseCase,
    private readonly findBeneficiaryByUserIdUseCase: FindBeneficiaryByUserIdUseCase,
    private readonly removeBeneficiaryUseCase: RemoveBeneficiaryUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать бенефициара',
    description: 'Создает нового бенефициара для текущего пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Бенефициар успешно создан',
    type: BeneficiaryResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async create(
    @Body() dto: CreateBeneficiaryDto,
    @Authorized('id') userId: string,
  ) {
    const command = BeneficiaryMapper.toCreateCommand(userId, dto);
    const result = await this.createBeneficiaryUseCase.execute(command);
    return BeneficiaryMapper.toResponse(result);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить бенефициара',
    description: 'Обновляет данные существующего бенефициара',
  })
  @ApiResponse({
    status: 200,
    description: 'Бенефициар успешно обновлен',
    type: BeneficiaryResponseDto,
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
    @Param('id') beneficiaryId: string,
    @Body() dto: UpdateBeneficiaryDto,
    @Authorized('id') userId: string,
  ) {
    const command = BeneficiaryMapper.toUpdateCommand(
      beneficiaryId,
      userId,
      dto,
    );
    const result = await this.updateBeneficiaryUseCase.execute(command);
    return BeneficiaryMapper.toResponse(result);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить список бенефициаров',
    description:
      'Возвращает список бенефициаров с пагинацией и фильтрацией (требуются права администратора)',
  })
  @ApiResponse({
    status: 200,
    description: 'Список успешно получен',
    type: BeneficiaryPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async findAll(@Query() queryDto: FindAllBeneficiaryQueryDto) {
    const command = BeneficiaryMapper.toFindAllCommand(queryDto);
    const paginatedResult =
      await this.findAllBeneficiaryUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      BeneficiaryMapper.toResponse,
    );
  }

  @Get('me')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить бенефициара текущего пользователя',
    description: 'Возвращает бенефициара, привязанного к текущему пользователю',
  })
  @ApiResponse({
    status: 200,
    description: 'Бенефициар успешно получен',
    type: [BeneficiaryResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Бенефициар не найден',
  })
  public async findMe(@Authorized('id') userId: string) {
    const command = BeneficiaryMapper.toFindByUserIdCommand(userId);
    const result = await this.findBeneficiaryByUserIdUseCase.execute(command);
    return result.map(BeneficiaryMapper.toResponse)
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Удалить бенефициара',
    description: 'Удаляет бенефициара по идентификатору',
  })
  @ApiResponse({
    status: 200,
    description: 'Бенефициар успешно удален',
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async remove(
    @Param('id') beneficiaryId: string,
    @Authorized('id') userId: string,
  ) {
    const command = BeneficiaryMapper.toRemoveCommand(beneficiaryId, userId);
    await this.removeBeneficiaryUseCase.execute(command);
    return { success: true };
  }
}
