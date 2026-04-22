export abstract class EmailSenderPort {
  public abstract send(to: string, subject: string, template: string): Promise<void>;
}
