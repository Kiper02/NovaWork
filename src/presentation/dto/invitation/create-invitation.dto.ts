import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateInvitationDto {
  @ApiProperty({
    description: 'Заголовок письма',
    example: 'Какой то текст',
  })
  @Length(2, 50)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Уникальный идентификатор получателя приглашения',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  @IsUUID()
  @IsNotEmpty()
  recipientId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор рабочего пространства',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  @IsUUID()
  @IsOptional()
  workspaceId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор проекта',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  @IsUUID()
  @IsOptional()
  projectId?: string;

  @ApiProperty({
    description: 'Сопроводительное письмо',
    example: 'Какой то текст',
  })
  @Length(50, 10000)
  @IsString()
  @IsNotEmpty()
  public coverLetter: string;
}
