import { UpdateProfileDto } from '../dto/profile/update-profile.dto';
import { IUpdateProfileCommand } from '../../core/use-cases/profile/update/update-profile.command';
import { ProfileEntity } from '../../core/domain/entities/profile.entity';
import { ProfileResponseDto } from '../dto/profile/profile-response.dto';
import { CreateProfileDto } from '../dto/profile/create-profile.dto';
import { ICreateProfileCommand } from '../../core/use-cases/profile/create-profile/create-profile.command';
import { FindAllProfileQueryDto } from '../dto/profile/find-all-profile-query.dto';
import { IFindAllProfileCommand } from '../../core/use-cases/profile/find-all/find-all-profile.command';
import { IFindMyProfileCommand } from '../../core/use-cases/profile/find-my/find-my-profile.command';

export class ProfileMapper {
  public static toCreateCommand(dto: CreateProfileDto): ICreateProfileCommand {
    return {
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
      userId: dto.userId,
    };
  }

  public static toUpdateCommand(
    id: string,
    dto: UpdateProfileDto,
  ): IUpdateProfileCommand {
    return {
      id: id,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
    };
  }

  public static toFindAllCommand(
    dto: FindAllProfileQueryDto,
  ): IFindAllProfileCommand {
    return {
      userId: dto.userId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindMyCommand(userId: string): IFindMyProfileCommand {
    return {
      userId: userId,
    }
  }

  public static toResponse(entity: ProfileEntity): ProfileResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      firstName: entity.firstName,
      middleName: entity.middleName,
      lastName: entity.lastName,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
