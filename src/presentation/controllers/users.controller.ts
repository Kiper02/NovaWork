import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseFilters,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../core/use-cases/user/create-user/create-user.use-case';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UserMapper } from '../mappers/user.mapper';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user/user-response.dto';
import { Roles } from '../decorators/roles.decorator';
import { Auth } from '../decorators/auth.decorator';
import { Authorized } from '../decorators/authorized.decorator';
import { FindMeUseCase } from '../../core/use-cases/user/find-me/find-me.use-case';
import { UserNotFoundExceptionFilter } from '../filters/user/user-not-found-exception.filter';
import { FindMeResponseDto } from '../dto/user/find-me-response.dto';

@ApiTags('Users')
@ApiCookieAuth()
@Auth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findMeUseCase: FindMeUseCase,
  ) {}

  @Roles('super_admin', 'admin')
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать нового пользователя',
    description:
      'Создает нового пользователя. Доступно для: super_admin, admin',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно создан',
    type: UserResponseDto,
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
    status: 409,
    description: 'Пользователь уже существует',
  })
  public async create(@Body() dto: CreateUserDto) {
    const command = UserMapper.toCreateCommand(dto);
    const user = await this.createUserUseCase.execute(command);
    return UserMapper.toResponse(user);
  }

  @UseFilters(UserNotFoundExceptionFilter)
  @Auth()
  @Get('me')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить информацию о себе',
    description:
      'Получает всю информацию о себе, включает account, profile',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь получен',
    type: FindMeResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден'
  })
  public async findMe(@Authorized('id') userId: string) {
    const command = UserMapper.toFindMeCommand(userId);
    const result = await this.findMeUseCase.execute(command);
    return UserMapper.toFindMeResponse(result);
  }
}