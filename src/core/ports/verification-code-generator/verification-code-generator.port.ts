export abstract class VerificationCodeGeneratorPort {
  abstract generateCode(): string;
  abstract generateExpiresAt(): Date;
}
