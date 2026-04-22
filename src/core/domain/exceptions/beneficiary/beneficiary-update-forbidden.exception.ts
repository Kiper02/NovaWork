export class BeneficiaryUpdateForbiddenException extends Error {
  public constructor() {
    super("You don't have access to update this beneficiary.");
  }
}