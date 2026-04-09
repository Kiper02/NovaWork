export class TaskEntity {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly minPrice: number,
    public readonly maxPrice: number,
    public readonly status: EnumTaskStatus,
    public readonly isPublished: boolean,
    public readonly userId: string,

    public readonly createdAt: Date,
    public readonly updatedAt: Date,

    public readonly workspaceId: string,
    public readonly projectId: string | null,
  ) {}
}

export enum EnumTaskStatus {
  NOT_DISTRIBUTED = "NOT_DISTRIBUTED",
  SUCCESS = "SUCCESS"
}