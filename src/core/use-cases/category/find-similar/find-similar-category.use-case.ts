import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../domain/repositories/shared/category.repository';
import { IFindAllCategorySimilarCommand } from './find-all-category-similar.command';

@Injectable()
export class FindSimilarCategoryUseCase {
  public constructor(private categoryRepository: CategoryRepository) {}

  public async execute(command: IFindAllCategorySimilarCommand) {
    return this.categoryRepository.findByTagsIntersection(
      command.tags ?? [],
      command.excludeIds ?? [],
      command.limit,
    );
  }
}