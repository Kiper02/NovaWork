import { UserResponseDto } from './user-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileResponseDto } from '../profile/profile-response.dto';

export class UserWithProfileResponseDto extends UserResponseDto {
  @ApiProperty({
    description: 'Профиль пользователя',
    type: () => ProfileResponseDto,
    nullable: true,
  })
  profile: ProfileResponseDto | null;
}
