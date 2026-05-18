import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateTaskViewDto {
  @ApiProperty({
    description: 'Уникальный идентификатор задачи',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  @IsUUID()
  @IsNotEmpty()
  public taskId: string;
}
