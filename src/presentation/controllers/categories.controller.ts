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
import { UpdateCategoryUseCase } from '../../core/use-cases/category/update/update-category.use-case';
import { FindAllCategoryUseCase } from '../../core/use-cases/category/find-all/find-all-category.use-case';
import { CategoryMapper } from '../mappers/category.mapper';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { FindAllCategoryQueryDto } from '../dto/category/find-all-category-query.dto';
import { CategoryResponseDto } from '../dto/category/category-response.dto';
import { GlobalRolesGuard } from '../guards/roles.guard';
import {
  UPDATE_RESOURCES,
} from '../../core/domain/constants/roles.constants';
import { CreateCategoryUseCase } from '../../core/use-cases/category/create/create-category.use-case';
import { CategoryPaginatedResponse } from '../dto/category/category-paginated-response';
import { FindSimilarCategoryUseCase } from '../../core/use-cases/category/find-similar/find-similar-category.use-case';
import { FindSimilarCategoryQueryDto } from '../dto/category/find-similar-category-query.dto';

@ApiTags('Category')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
    private readonly findSimilarCategoryUseCase: FindSimilarCategoryUseCase,
  ) {}

  @Roles(...UPDATE_RESOURCES)
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новую категорию',
    description: `Создает новую категорию. Доступно для: ${UPDATE_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Категория успешно создана',
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async create(@Body() dto: CreateCategoryDto) {
    const command = CategoryMapper.toCreateCommand(dto);
    const category = await this.createCategoryUseCase.execute(command);
    return CategoryMapper.toResponse(category);
  }

  @Roles(...UPDATE_RESOURCES)
  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить категорию',
    description: `Обновляет категорию. Доступно для: ${UPDATE_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Категория успешно обновлена',
    type: CategoryResponseDto,
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
    description: 'Категория не найдена',
  })
  // @UseFilters(CategoryNotFoundExceptionFilter)
  public async update(
    @Param('id') categoryId: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    const command = CategoryMapper.toUpdateCommand(categoryId, dto);
    const category = await this.updateCategoryUseCase.execute(command);
    return CategoryMapper.toResponse(category);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все категории',
    description: `Получает все категории платформы с пагинацией.`,
  })
  @ApiResponse({
    status: 200,
    description: 'Категории успешно получены',
    type: CategoryPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async findAll(@Query() query: FindAllCategoryQueryDto) {
    const command = CategoryMapper.toFindAllCommand(query);
    const paginatedResult = await this.findAllCategoryUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      CategoryMapper.toResponse,
    );
  }

  @Get('similar')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить похожие категории по тегам',
    description:
      'Возвращает список категорий, наиболее релевантных переданным тегам. Используется для динамических рекомендаций при выборе категорий.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список похожих категорий',
    type: [CategoryResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет доступа' })
  async findSimilar(@Query() query: FindSimilarCategoryQueryDto) {
    const command = CategoryMapper.toFindSimilarCommand(query);
    const categories = await this.findSimilarCategoryUseCase.execute(command);
    return categories.map(CategoryMapper.toResponse);
  }
}
