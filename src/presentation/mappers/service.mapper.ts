import { CreateServiceDto } from '../dto/service/create-service.dto';
import { UpdateServiceDto } from '../dto/service/update-service.dto';
import { FindAllServiceQueryDto } from '../dto/service/find-all-service-query.dto';
import { IFindAllServiceCommand } from '../../core/use-cases/service/find-all/find-all-service.command';
import { ServiceEntity } from '../../core/domain/entities/project/service.entity';
import { ServiceResponseDto } from '../dto/service/service-response.dto';
import { ICreateServiceCommand } from '../../core/use-cases/service/create/create-service.command';
import { IServiceUpdateCommand } from '../../core/use-cases/service/update/service-update.command';
import { IFindServiceByIdCommand } from '../../core/use-cases/service/find-by-id/find-service-by-id.command';
import { FindMyServiceQueryDto } from '../dto/service/find-my-service-query.dto';
import { ServiceAggregate } from '../../core/domain/aggregates/service.aggregate';
import { CategoryMapper } from './category.mapper';
import { UserMapper } from './user.mapper';
import { ServiceResponseForDetailsDto } from '../dto/service/service-response-for-details.dto';
import { ProfileMapper } from './profile.mapper';
import { StoragePort } from '../../core/ports/storage/storage.port';
import { ProfileEntity } from '../../core/domain/entities/user/profile.entity';
import { ProfileResponseDto } from '../dto/profile/profile-response.dto';

export class ServiceMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateServiceDto,
  ): ICreateServiceCommand {
    return {
      title: dto.title,
      description: dto.description,
      price: dto.price,
      isPublished: dto.isPublished,
      userId,
      categoryIds: dto.categoryIds,
      workspaceId: dto.workspaceId,
    };
  }

  public static toFindByIdCommand(serviceId: string): IFindServiceByIdCommand {
    return {
      serviceId: serviceId,
    };
  }

  public static toUpdateCommand(
    id: string,
    userId: string,
    dto: UpdateServiceDto,
  ): IServiceUpdateCommand {
    return {
      id,
      userId,
      title: dto.title,
      description: dto.description,
      price: dto.price,
      categoryIds: dto.categoryIds,
      isPublished: dto.isPublished,
    };
  }

  public static toFindAllCommand(
    dto: FindAllServiceQueryDto,
  ): IFindAllServiceCommand {
    return {
      userId: dto.userId,
      title: dto.title,
      description: dto.description,
      isPublished: dto.isPublished,
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindMyCommand(userId: string, dto: FindMyServiceQueryDto) {
    return {
      userId: userId,
      title: dto.title,
      description: dto.description,
      isPublished: dto.isPublished,
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static async toResponseForDetails(
    aggregate: ServiceAggregate,
    storage: StoragePort
  ): Promise<ServiceResponseForDetailsDto> {
    const { service, categories, creator } = aggregate;

    const categoriesResponse = categories.map(CategoryMapper.toResponse);

    const { user, profile } = creator;

    let profileResponse: ProfileResponseDto | null = null;

    if(profile) {
      profileResponse = await ProfileMapper.toResponse(profile, storage);
    }

    const userResponse = UserMapper.toResponse(user);

    return {
      id: service.id,
      user: {
        ...userResponse,
        profile: profileResponse
      },
      title: service.title,
      description: service.description,
      price: service.price,
      isPublished: service.isPublished,
      workspaceId: service.workspaceId,
      categories: categoriesResponse,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };
  }

  public static toResponse(entity: ServiceEntity): ServiceResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      title: entity.title,
      description: entity.description,
      price: entity.price,
      isPublished: entity.isPublished,
      workspaceId: entity.workspaceId,
      categoryIds: entity.categoryIds,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
