import { IFileUploadInput } from './storage.types';

export abstract class StoragePort {
  public abstract save(input: IFileUploadInput): Promise<void>;
  public abstract get(key: string): Promise<string>;
  public abstract remove(key: string): Promise<void>;
}