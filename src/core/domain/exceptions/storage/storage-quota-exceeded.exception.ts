export class StorageQuotaExceededException extends Error {
  public constructor() {
    super(
      'You have exhausted the resources available to you for storing static',
    );
  }
}
