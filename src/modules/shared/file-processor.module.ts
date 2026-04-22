import { Global, Module } from '@nestjs/common';
import { FileProcessorService } from '../../core/domain/services/files/file-processor.service';

@Global()
@Module({
  providers: [
    {
      provide: FileProcessorService,
      useClass: FileProcessorService,
    },
  ],
  exports: [FileProcessorService],
})
export class FileProcessorModule {}
