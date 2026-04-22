import { Category, Prisma, Service, ServiceCategory } from '@prisma/client';
import { ServiceEntity } from '../../../../../core/domain/entities/project/service.entity';

type ServiceWithCategories = Service & {
  serviceCategories?: (ServiceCategory & { category?: Category })[];
};

export class ServiceMapper {
  public static toEntity(model: ServiceWithCategories): ServiceEntity {
    const categoryIds =
      (model.serviceCategories
        ?.map((serviceCategory) => serviceCategory.category?.id)
        .filter(Boolean) as string[]) ?? [];

    return new ServiceEntity(
      model.id,
      model.title,
      model.description,
      model.price.toNumber(),
      model.isPublished,
      model.userId,
      model.workspaceId,
      categoryIds,
      model.createdAt,
      model.updatedAt
    )
  }

  public static toModel(entity: ServiceEntity): Prisma.ServiceCreateInput {
    return {
      id: entity.id,
      user: {
        connect: {
          id: entity.userId
        }
      },
      workspace: {
        connect: {
          id: entity.workspaceId
        }
      },
      title: entity.title,
      description: entity.description,
      price: entity.price,
      isPublished: entity.isPublished,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<ServiceEntity, 'id' | 'createdAt'>>,
  ): Prisma.ServiceUpdateInput {
    const result: Prisma.ServiceUpdateInput = {};

    if (data.title) result.title = data.title;
    if (data.description) result.description = data.description;
    if (data.price) result.price = data.price;
    if (data.isPublished) result.isPublished = data.isPublished;
    if (data.updatedAt) result.updatedAt = data.updatedAt;

    return result;
  }
}
