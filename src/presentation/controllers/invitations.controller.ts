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
import { Roles } from '../decorators/roles.decorator';
import { CreateInvitationUseCase } from '../../core/use-cases/invitation/create/create-invitation.use-case';
import { UpdateInvitationUseCase } from '../../core/use-cases/invitation/update/update-invitation.use-case';
import { FindAllInvitationUseCase } from '../../core/use-cases/invitation/find-all/find-all-invitation.use-case';
import { InvitationMapper } from '../mappers/invitation.mapper';
import { InvitationResponseDto } from '../dto/invitation/invitation-response.dto';
import { InvitationPaginatedResponse } from '../dto/invitation/invitation-paginated-response';
import { FindAllInvitationQueryDto } from '../dto/invitation/find-all-invitation-query.dto';
import { FindByIdInvitationUseCase } from '../../core/use-cases/invitation/find-by-id/find-by-id-invitation.use-case';
import { CreateInvitationDto } from '../dto/invitation/create-invitation.dto';
import { UpdateInvitationDto } from '../dto/invitation/update-invitation.dto';
import { FindMyInvitationQueryDto } from '../dto/invitation/find-my-invitation-query.dto';

@ApiTags('Invitations')
@ApiCookieAuth()
@UseGuards(GlobalRolesGuard)
@Auth()
@Controller('invitations')
export class InvitationsController {
  public constructor(
    private readonly createInvitationUseCase: CreateInvitationUseCase,
    private readonly updateInvitationUseCase: UpdateInvitationUseCase,
    private readonly findAllInvitationUseCase: FindAllInvitationUseCase,
    private readonly findByIdInvitationUseCase: FindByIdInvitationUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Создать новое приглашение',
    description:
      'Создает новое приглашение в рабочее пространство или на проект',
  })
  @ApiResponse({
    status: 200,
    description: 'Приглашение успешно создано',
    type: InvitationResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async create(
    @Body() dto: CreateInvitationDto,
    @Authorized('id') userId: string,
  ) {
    const command = InvitationMapper.toCreateCommand(userId, dto);
    const result = await this.createInvitationUseCase.execute(command);
    return InvitationMapper.toResponse(result);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Обновить приглашение',
    description: `Обновляет приглашение`,
  })
  @ApiResponse({
    status: 200,
    description: 'Приглашение успешно обновлен',
    type: InvitationResponseDto,
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
    @Body() dto: UpdateInvitationDto,
    @Authorized('id') userId: string,
    @Param() invitationId: string,
  ) {
    const command = InvitationMapper.toUpdateCommand(invitationId, userId, dto);
    const result = await this.updateInvitationUseCase.execute(command);
    return InvitationMapper.toResponse(result);
  }

  @Roles(...READ_RESOURCES)
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить все приглашения',
    description: `Получает все приглашения. Доступно для пользователей с ролями ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Приглашения успешно получены',
    type: InvitationPaginatedResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Не авторизован',
  })
  public async findAll(
    @Query() queryDto: FindAllInvitationQueryDto,
    @Authorized('id') userId: string,
  ) {
    const command = InvitationMapper.toFindAllCommand(userId, queryDto);
    const paginatedResult =
      await this.findAllInvitationUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      InvitationMapper.toResponse,
    );
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить мои приглашения',
    description: `Получает все отправленные или полученные приглашения`,
  })
  @ApiResponse({
    status: 200,
    description: 'Приглашения успешно получены',
    type: InvitationPaginatedResponse,
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
    @Query() queryDto: FindMyInvitationQueryDto,
  ) {
    const command = InvitationMapper.toFindMyCommand(userId, queryDto);
    const paginatedResult =
      await this.findAllInvitationUseCase.execute(command);
    return PaginationFormatterUtil.format(
      paginatedResult,
      InvitationMapper.toResponse,
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Получить приглашение по ID',
    description: `Получает отклик по идентификатору. Доступно для: отправителя/получателя и пользователям с ролями ${READ_RESOURCES}`,
  })
  @ApiResponse({
    status: 200,
    description: 'Приглашение успешно обновлен',
    type: InvitationResponseDto,
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
    @Param() invitationId: string,
  ) {
    const command = InvitationMapper.toFindByIdCommand(userId, invitationId);
    const result = await this.findByIdInvitationUseCase.execute(command);
    return InvitationMapper.toResponse(result);
  }
}
