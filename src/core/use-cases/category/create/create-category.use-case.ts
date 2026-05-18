import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../domain/repositories/shared/category.repository';
import { ICreateCategoryCommand } from './create-category.command';
import { CategoryEntity } from '../../../domain/entities/shared/category.entity';
import {v4 as uuid} from 'uuid';

@Injectable()
export class CreateCategoryUseCase {
  public constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {
  }


  public async execute(command: ICreateCategoryCommand) {
    const categoryEntity = new CategoryEntity(
      uuid(),
      command.name,
      command.parentId ?? null,
      [],
      command.description ?? null,
      command.tags ?? []
    )

    return this.categoryRepository.save(categoryEntity);
  }
}