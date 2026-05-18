import { Module } from '@nestjs/common';
import { CategoriesController } from '../../presentation/controllers/categories.controller';
import { CreateCategoryUseCase } from '../../core/use-cases/category/create/create-category.use-case';
import { UpdateCategoryUseCase } from '../../core/use-cases/category/update/update-category.use-case';
import { FindAllCategoryUseCase } from '../../core/use-cases/category/find-all/find-all-category.use-case';
import { FindSimilarCategoryUseCase } from '../../core/use-cases/category/find-similar/find-similar-category.use-case';


@Module({
  controllers: [CategoriesController],
  providers: [
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    FindAllCategoryUseCase,
    FindSimilarCategoryUseCase,
  ],
})
export class CategoryModule {}
