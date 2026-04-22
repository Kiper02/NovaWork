import { Module } from '@nestjs/common';
import { ProjectsController } from '../../presentation/controllers/projects.controller';
import { CreateProjectUseCase } from '../../core/use-cases/project/create/create-project.use-case';
import { UpdateProjectUseCase } from '../../core/use-cases/project/update/update-project.use-case';
import { FindAllProjectUseCase } from '../../core/use-cases/project/find-all/find-all-project.use-case';
import { FindByIdProjectUseCase } from '../../core/use-cases/project/find-by-id/find-by-id-project.use-case';


@Module({
  controllers: [ProjectsController],
  providers: [
    CreateProjectUseCase,
    UpdateProjectUseCase,
    FindAllProjectUseCase,
    FindByIdProjectUseCase,
  ],
  exports: [],
})
export class ProjectModule {}
