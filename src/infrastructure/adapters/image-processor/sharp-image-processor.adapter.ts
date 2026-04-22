import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { ImageProcessorPort } from '../../../core/ports/image-processor/image-processor.port';
import { IProcessImageInput } from '../../../core/ports/image-processor/image-processor.types';

@Injectable()
export class SharpImageProcessorAdapter implements ImageProcessorPort {
  async process(input: IProcessImageInput): Promise<Buffer> {
    let pipeline = sharp(input.buffer);
    if (input.width || input.height) {
      pipeline = pipeline.resize(input.width, input.height, { fit: 'cover' });
    }
    if (input.targetFormat === 'webp') {
      pipeline = pipeline.webp({ quality: input.quality ?? 80 });
    }
    return pipeline.toBuffer();
  }
}
