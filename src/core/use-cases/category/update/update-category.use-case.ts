import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../domain/repositories/shared/category.repository';
import { IUpdateCategoryCommand } from './update-category.command';
import { CategoryNotFoundException } from '../../../domain/exceptions/category/category-not-found.exception';

@Injectable()
export class UpdateCategoryUseCase {
  public constructor(private categoryRepository: CategoryRepository) {
  }

  public async execute(command: IUpdateCategoryCommand) {
    const category = await this.categoryRepository.findById(command.id)

    if(!category) {
      throw new CategoryNotFoundException()
    }

    return this.categoryRepository.update(category.id, command)
  }
}