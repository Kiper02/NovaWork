export class BeneficiaryRemoveForbiddenException extends Error {
  public constructor() {
    super("You don't have access to remove this beneficiary.");
  }
}