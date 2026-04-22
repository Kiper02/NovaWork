import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../domain/repositories/shared/category.repository';
import { IFindAllCategoryCommand } from './find-all-category.command';
import { CategoryFiltersValueObject } from '../../../domain/value-objects/category/category-filters.value.object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindAllCategoryUseCase {
  public constructor(private categoryRepository: CategoryRepository) {
  }

  public async execute(command: IFindAllCategoryCommand) {
    const params = new CategoryFiltersValueObject(
      command.name,
      command.parentId
    )

    const pagination = new PaginationParamsValueObject(command.page, command.limit)

    return this.categoryRepository.findAll(params, pagination)
  }
}