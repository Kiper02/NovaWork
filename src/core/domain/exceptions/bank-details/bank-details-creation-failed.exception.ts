export class BankDetailsCreationFailedException extends Error {
  public constructor(reason: string) {
    super(`Bank details creation failed: ${reason}`);
  }
}