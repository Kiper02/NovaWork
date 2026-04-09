export class ProfileEntity {
  public constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly middleName: string,
    public readonly lastName: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}