export class ChatBlock {
  public constructor(
    public readonly blockedAt: Date,
    public readonly blockedByUserId: string,
    public readonly reason: string,
    public readonly expiresAt?: Date,
  ) {}

  public isActive(now: Date = new Date()): boolean {
    return this.expiresAt !== undefined && this.expiresAt > now;
  }
}
