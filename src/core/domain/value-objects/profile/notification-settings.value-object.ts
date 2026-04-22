export class NotificationSettingsValueObject {
  public constructor(
    public readonly emailEnabled: boolean,
    public readonly pushEnabled: boolean,
  ) {}

  static default() {
    return new NotificationSettingsValueObject(true, true);
  }

  public toJSON(): Record<string, boolean> {
    return {
      emailEnabled: this.emailEnabled,
      pushEnabled: this.pushEnabled,
    };
  }

  public static fromJSON(
    data: Record<string, boolean>,
  ): NotificationSettingsValueObject {
    return new NotificationSettingsValueObject(
      data.emailEnabled ?? true,
      data.pushEnabled ?? true,
    );
  }
}
