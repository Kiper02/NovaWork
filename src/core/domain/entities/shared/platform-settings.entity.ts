export interface IPlatformSettings {
  fileLimits: {
    maxFileSizeBytes: bigint;
    maxFilesPerMessage: bigint;
    allowedMimeTypes: string[];
  };
  storageQuotas: {
    freeBytes: bigint;
    proBytes: bigint;
  };
  commission: {
    withdrawal: {
      free: number;
      pro: number;
    },
    contract: {
      free: number;
      pro: number;
    }
  }
}

export class PlatformSettingsEntity {
  public constructor(
    public readonly id: string,
    public settings: IPlatformSettings,
    public updatedAt: Date,
    public updatedBy: string,
    public version: number,
  ) {}

  public update(newSettings: Partial<IPlatformSettings>, updatedBy: string) {
    this.settings = { ...this.settings, ...newSettings };
    this.updatedBy = updatedBy;
    this.updatedAt = new Date();
    this.version++;
  }
}
