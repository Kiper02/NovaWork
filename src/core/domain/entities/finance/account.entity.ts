import { StorageQuotaExceededException } from '../../exceptions/storage/storage-quota-exceeded.exception';

export class AccountEntity {
  public constructor(
    public readonly id: string,
    public readonly userId: string,
    public availableBalance: number,
    public frozenBalance: number,
    public storageQuotaBytes: bigint,
    public storageUsedBytes: bigint,
  ) {}

  public canUpload(fileSizeBytes: number): boolean {
    const size = BigInt(fileSizeBytes);
    return this.storageUsedBytes + size <= this.storageQuotaBytes;
  }

  public addUsedBytes(bytes: number) {
    const size = BigInt(bytes);
    if (!this.canUpload(bytes)) throw new StorageQuotaExceededException();
    this.storageUsedBytes += size;
  }

  public removeUsedBytes(bytes: number) {
    const size = BigInt(bytes);
    this.storageUsedBytes =
      this.storageUsedBytes - size < 0n ? 0n : this.storageUsedBytes - size;
  }
}
