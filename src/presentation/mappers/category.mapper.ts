import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { ICreateCategoryCommand } from '../../core/use-cases/category/create/create-category.command';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { IUpdateCategoryCommand } from '../../core/use-cases/category/update/update-category.command';
import { FindAllCategoryQueryDto } from '../dto/category/find-all-category-query.dto';
import { IFindAllCategoryCommand } from '../../core/use-cases/category/find-all/find-all-category.command';
import { CategoryEntity } from '../../core/domain/entities/shared/category.entity';
import { CategoryResponseDto } from '../dto/category/category-response.dto';
import { FindSimilarCategoryQueryDto } from '../dto/category/find-similar-category-query.dto';
import {
  IFindAllCategorySimilarCommand
} from '../../core/use-cases/category/find-similar/find-all-category-similar.command';

export class CategoryMapper {
  public static toCreateCommand(
    dto: CreateCategoryDto,
  ): ICreateCategoryCommand {
    return {
      name: dto.name,
      parentId: dto.parentId,
      description: dto.description,
      tags: dto.tags
    };
  }

  public static toUpdateCommand(
    categoryId: string,
    dto: UpdateCategoryDto,
  ): IUpdateCategoryCommand {
    return {
      id: categoryId,
      name: dto.name,
      description: dto.description,
      tags: dto.tags
    };
  }

  public static toFindAllCommand(
    query: FindAllCategoryQueryDto,
  ): IFindAllCategoryCommand {
    return {
      name: query.name,
      parentId: query.parentId,
      page: query.page,
      limit: query.limit,
    };
  }

  public static toFindSimilarCommand(query: FindSimilarCategoryQueryDto): IFindAllCategorySimilarCommand {
    return {
      name: query.name,
      parentId: query.parentId,
      page: query.page,
      limit: query.limit,
      excludeIds: query.excludeIds,
      tags: query.tags
    };
  }

  public static toResponse(entity: CategoryEntity): CategoryResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      parentId: entity.parentId,
      childrenIds: entity.childrenIds,
      tags: entity.tags
    }
  }
}