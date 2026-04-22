import { UserEntity } from '../../core/domain/entities/user/user.entity';
import { UserResponseDto } from '../dto/user/user-response.dto';
import { RegisterDto } from '../dto/auth/register.dto';
import { LoginDto } from '../dto/auth/login.dto';
import { IRegisterCommand } from '../../core/use-cases/auth/register/register.command';
import { ILoginCommand } from '../../core/use-cases/auth/login/login.command';

export class AuthMapper {
  public static toRegisterCommand(dto: RegisterDto): IRegisterCommand {
    return {
      username: dto.username,
      password: dto.password,
      email: dto.email,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
    };
  }

  public static toLoginCommand(dto: LoginDto): ILoginCommand {
    return {
      email: dto.email,
      password: dto.password,
    }
  }

  public static toResponse(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      username: entity.username,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
