import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  NotFound,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { StoragePort } from '../../../core/ports/storage/storage.port';
import { IFileUploadInput } from 'src/core/ports/storage/storage.types';
import {
  StorageDeleteException,
  StorageException,
  StorageFileNotFoundException,
  StorageUploadException,
} from '../../../core/domain/exceptions/storage/storage.exception';

@Injectable()
export class S3StorageAdapter implements StoragePort {
  private readonly client: S3Client;
  private readonly bucket: string;

  public constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      endpoint: this.configService.getOrThrow<string>('S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'S3_SECRET_ACCESS_KEY',
        ),
      },
      forcePathStyle: true,
      region: 'ru-1',
    });
    this.bucket = this.configService.getOrThrow<string>('S3_BUCKET_NAME');
  }
  public async save(input: IFileUploadInput): Promise<void> {
    const command: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: String(input.key),
      Body: input.buffer,
      ContentType: input.mimeType,
    };

    try {
      await this.client.send(new PutObjectCommand(command));
    } catch (e) {
      throw new StorageUploadException(`Failed to upload file ${input.key}`, e);
    }
  }
  async get(key: string): Promise<string> {
    const headCommand = new HeadObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    try {
      await this.client.send(headCommand);
    } catch (e) {
      if (e instanceof NotFound || e.name === 'NotFound') {
        throw new StorageFileNotFoundException(`File ${key} not found`, e);
      }
      throw new StorageException(`Failed to check existence of ${key}`, e);
    }
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }
  public async remove(key: string): Promise<void> {
    const command = new DeleteObjectCommand({ Bucket: this.bucket, Key: key });
    try {
      await this.client.send(command);
    } catch (e) {
      throw new StorageDeleteException(`Failed to delete file ${key}`, e);
    }
  }
}