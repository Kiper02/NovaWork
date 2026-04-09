import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Put,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileResponseDto } from '../dto/profile/profile-response.dto';
import { CreateProfileUseCase } from '../../core/use-cases/profile/create-profile/create-profile.use-case';
import { CreateProfileDto } from '../dto/profile/create-profile.dto';
import { ProfileMapper } from '../mappers/profile.mapper';
import { Auth } from '../decorators/auth.decorator';
import { Roles } from '../decorators/roles.decorator';
import { FindAllProfileQueryDto } from '../dto/profile/find-all-profile-query.dto';
import { PaginationFormatterUtil } from '../utils/pagination-formatter.util';
import { FindAllProfileUseCase } from '../../core/use-cases/profile/find-all/find-all-profile.use-case';
import { UpdateProfileDto } from '../dto/profile/update-profile.dto';
import { Authorized } from '../decorators/authorized.decorator';
import { UpdateProfileUseCase } from '../../core/use-cases/profile/update/update-profile.use-case';
import { ProfilePaginatedResponse } from '../dto/profile/profile-paginated-response';
import { FindMyProfileUseCase } from '../../core/use-cases/profile/find-my/find-my-profile.use-case';
import { ProfileNotFoundExceptionFilter } from '../filters/profile/profile-not-found-exception.filter';

@ApiTags('Profile')
@ApiCookieAuth()
@Auth()
@Controller('profile')
export class ProfilesController {
  constructor(
    private readonly createProfileUseCase: CreateProfileUseCase,
    private readonly findAllProfileUseCase: FindAllProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly findMyProfileUseCase: FindMyProfileUseCase,
  ) {}

  @Roles('super_admin', 'admin')
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новый профиль',
    description: 'Создает новый профиль. Доступно для: super_admin, admin',
  })
  @ApiResponse({
    status: 200,
    description: 'Профиль успешно создан',
    type: ProfileResponseDto,
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
  public async create(@Body() dto: CreateProfileDto) {
    const command = ProfileMapper.toCreateCommand(dto);
    const profile = await this.createProfileUseCase.execute(command);
    return ProfileMapper.toResponse(profile);
  }

  @Put()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить профиль',
    description: 'Обновляет профиль',
  })
  @ApiResponse({
    status: 200,
    description: 'Профиль успешно обновлен',
    type: ProfileResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Профиль не найден',
  })
  public async update(
    @Body() dto: UpdateProfileDto,
    @Authorized('id') userId: string,
  ) {
    const command = ProfileMapper.toUpdateCommand(userId, dto);
    const profile = await this.updateProfileUseCase.execute(command);
    return ProfileMapper.toResponse(profile);
  }

  @Roles('super_admin', 'admin', 'moderator', 'support')
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все профили',
    description:
      'Получает все профили платформы. Доступно для: super_admin, admin, moderator, support',
  })
  @ApiResponse({
    status: 200,
    description: 'Профили успешно получены',
    type: ProfilePaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  public async findAll(@Query() query: FindAllProfileQueryDto) {
    const command = ProfileMapper.toFindAllCommand(query);
    const paginatedResult = await this.findAllProfileUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      ProfileMapper.toResponse,
    );
  }

  @Get('my')
  @UseFilters(ProfileNotFoundExceptionFilter)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить мой профиль',
    description:
      'Получает профиль текущего пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Профиль успешно получен',
    type: ProfilePaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Профиль не найден',
  })
  public async findMy(@Authorized('id') userId: string) {
    const command = ProfileMapper.toFindMyCommand(userId);
    const profile = await this.findMyProfileUseCase.execute(command);
    return ProfileMapper.toResponse(profile);
  }
}
