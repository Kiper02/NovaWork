import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class FindMyInvitationQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Дата создания. Поиск больше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtStart?: Date;

  @ApiProperty({
    description: 'Дата создания. Поиск меньше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtEnd?: Date;

  @ApiProperty({
    description: 'Уникальный идентификатор проекта',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public projectId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор рабочего пространства',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public workspaceId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор владельца приглашения',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public senderId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор получателя приглашения',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public recipientId?: string;
}
