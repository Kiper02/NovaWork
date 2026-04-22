import { IProcessImageInput } from './image-processor.types';

export abstract class ImageProcessorPort {
  public abstract process(input: IProcessImageInput): Promise<Buffer>;
}