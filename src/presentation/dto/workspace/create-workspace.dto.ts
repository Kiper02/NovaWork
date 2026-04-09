import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({
    description: 'Название рабочего пространства',
    example: 'workspace123',
    minLength: 3,
    maxLength: 30,
  })
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  public name: string;
}
