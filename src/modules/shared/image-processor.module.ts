import { Global, Module } from '@nestjs/common';
import { ImageProcessorPort } from '../../core/ports/image-processor/image-processor.port';
import { SharpImageProcessorAdapter } from '../../infrastructure/adapters/image-processor/sharp-image-processor.adapter';

@Global()
@Module({
  providers: [
    {
      provide: ImageProcessorPort,
      useClass: SharpImageProcessorAdapter,
    },
  ],
  exports: [ImageProcessorPort],
})
export class ImageProcessorModule {}
