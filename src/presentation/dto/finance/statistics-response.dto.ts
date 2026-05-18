import { ApiProperty } from '@nestjs/swagger';

export class StatisticsResponseDto {
  @ApiProperty({ description: 'Доход' })
  income: number;

  @ApiProperty({ description: 'Расход' })
  expense: number;

  @ApiProperty({ description: 'Процент дохода' })
  percent: number;
}
