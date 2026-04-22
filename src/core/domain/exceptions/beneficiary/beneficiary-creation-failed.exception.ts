export class BeneficiaryCreationFailedException extends Error {
  public constructor(reason: string) {
    super(`Beneficiary creation failed: ${reason}`);
  }
}