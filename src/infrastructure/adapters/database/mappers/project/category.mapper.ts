import { Category, Prisma } from '@prisma/client';
import { CategoryEntity } from '../../../../../core/domain/entities/shared/category.entity';


export class CategoryMapper {
  public static toEntity(model: Category & {children: Category[]}): CategoryEntity {
    const childrenIds = model.children.map((child) => child.id);

    return new CategoryEntity(
      model.id,
      model.name,
      model.parentId,
      childrenIds,
      model.description ?? null,
      model.tags
    );
  }

  public static toModel(entity: CategoryEntity): Category {
    return {
      id: entity.id,
      name: entity.name,
      parentId: entity.parentId,
      description: entity.description,
      tags: entity.tags
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<CategoryEntity, 'id' | 'createdAt'>>,
  ): Prisma.CategoryUpdateInput {
    const result: Prisma.CategoryUpdateInput = {};

    if(data.name) result.name = data.name;
    if(data.description) result.description = data.description;
    if (data.tags) result.tags = data.tags;

    return result;
  }
}
