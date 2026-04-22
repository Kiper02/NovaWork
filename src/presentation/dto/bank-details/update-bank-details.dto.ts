import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateBankDetailsDto {
  @ApiProperty({
    description: 'Флаг – сделать реквизиты основными для бенефициара',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;
}
