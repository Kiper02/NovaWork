export abstract class EmailSenderPort {
  abstract sendVerificationCode(to: string, code: string): Promise<void>;
}
