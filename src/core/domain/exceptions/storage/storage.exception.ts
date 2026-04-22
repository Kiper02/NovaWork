export class StorageException extends Error {
  constructor(
    public readonly message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
  }
}

export class StorageUploadException extends StorageException {}
export class StorageFileNotFoundException extends StorageException {}
export class StorageDeleteException extends StorageException {}