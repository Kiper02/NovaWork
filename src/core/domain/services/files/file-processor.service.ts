import { Injectable } from '@nestjs/common';
import { ImageProcessorPort } from '../../../ports/image-processor/image-processor.port';
import { StoragePort } from '../../../ports/storage/storage.port';
import { v4 as uuid } from 'uuid';
import { IProcessImageInput } from '../../../ports/image-processor/image-processor.types';
import { IFileUploadInput } from '../../../ports/storage/storage.types';

@Injectable()
export class FileProcessorService {
  public constructor(
    private readonly imageProcessorPort: ImageProcessorPort,
    private readonly storagePort: StoragePort,
  ) {}

  public async processImage(picture: Buffer, dir: string): Promise<string> {
    const fileKey = `${dir}/${uuid()}`;
    const processImageInput: IProcessImageInput = {
      buffer: picture,
      targetFormat: 'webp',
      width: 40,
      height: 40,
    };
    const imageBuffer =
      await this.imageProcessorPort.process(processImageInput);
    const fileUploadInput: IFileUploadInput = {
      key: fileKey,
      buffer: imageBuffer,
      mimeType: 'webp',
    };
    await this.storagePort.save(fileUploadInput);
    return fileKey;
  }
}