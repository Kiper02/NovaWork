import { CreateUserDto } from '../dto/user/create-user.dto';
import { UserEntity } from '../../core/domain/entities/user/user.entity';
import { UserResponseDto } from '../dto/user/user-response.dto';
import { ICreateUserCommand } from '../../core/use-cases/user/create-user/create-user.command';
import { IFindMeCommand } from '../../core/use-cases/user/find-me/find-me.command';
import { UserAggregate } from '../../core/domain/aggregates/user.aggregate';
import { FindMeResponseDto } from '../dto/user/find-me-response.dto';
import { AccountResponseDto } from '../dto/account/account-response.dto';
import { ProfileResponseDto } from '../dto/profile/profile-response.dto';
import { AccountMapper } from './account.mapper';
import { ProfileMapper } from './profile.mapper';
import { StoragePort } from '../../core/ports/storage/storage.port';

export class UserMapper {
  public static toCreateCommand(dto: CreateUserDto): ICreateUserCommand {
    return {
      username: dto.username,
      password: dto.password,
      email: dto.email,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
    };
  }

  public static toFindMeCommand(userId: string): IFindMeCommand {
    return {
      userId: userId,
    }
  }

  public static async toFindMeResponse(aggregate: UserAggregate, storage: StoragePort): Promise<FindMeResponseDto> {
    const {user, account, profile, workspaces} = aggregate;

    let accountResponseDto: AccountResponseDto | null = null;
    let profileResponseDto: ProfileResponseDto | null = null;

    if(account) {
      accountResponseDto = AccountMapper.toResponse(account);
    }
    if(profile) {
      profileResponseDto = await ProfileMapper.toResponse(profile, storage);
    }

    const userResponseDto = this.toResponse(user);

    return  {
      ...userResponseDto,
      account: accountResponseDto,
      profile: profileResponseDto,
      workspaces: workspaces ?? []
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