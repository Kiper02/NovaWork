import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user/user-response.dto';
import { RegisterUseCase } from '../../core/use-cases/auth/register/register.use-case';
import { RegisterDto } from '../dto/auth/register.dto';
import { UserAlreadyExistsException } from '../../core/domain/exceptions/user/user-already-exists.exception';
import { AuthMapper } from '../mappers/auth.mapper';
import { LoginUseCase } from '../../core/use-cases/auth/login/login.use-case';
import { LoginDto } from '../dto/auth/login.dto';
import { SessionHelper } from '../helpers/session.helper';
import type {Request, Response} from 'express'
import { Auth } from '../decorators/auth.decorator';
import { ConfigService } from '@nestjs/config';
import { UserAlreadyExistsExceptionFilter } from '../filters/user/user-already-exists-exception.filter';
import { UserNotFoundExceptionFilter } from '../filters/user/user-not-found-exception.filter';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @UseFilters(UserAlreadyExistsExceptionFilter)
  @Post('register')
  @ApiOperation({
    summary: 'Регистрация',
    description: 'Регистрирует нового пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно зарегистрирован',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Пользователь уже существует',
  })
  public async register(@Body() dto: RegisterDto) {
    const command = AuthMapper.toRegisterCommand(dto);
    const user = await this.registerUseCase.execute(command);
    return AuthMapper.toResponse(user);
  }

  @UseFilters(UserNotFoundExceptionFilter)
  @Post('login')
  @ApiOperation({
    summary: 'Вход в систему',
    description:
      'Создается сессия пользователя для доступа к методам, требующие аутентификации',
  })
  @ApiResponse({
    status: 200,
    description: 'Сессия создана',
    type: Boolean,
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  public async login(@Body() dto: LoginDto, @Req() req: Request) {
    const command = AuthMapper.toLoginCommand(dto);
    const user = await this.loginUseCase.execute(command);
    await SessionHelper.save(req, user);
  }

  @Auth()
  @Post('logout')
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Выход из системы',
    description: 'Завершение сессии пользователя и удаление cookies',
  })
  @ApiResponse({
    status: 200,
    description: 'Сессия удалена',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    configService: ConfigService,
  ) {
    await SessionHelper.destroy(req, res, configService);
  }
}
