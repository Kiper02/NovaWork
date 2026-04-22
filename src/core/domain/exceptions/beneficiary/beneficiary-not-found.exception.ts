export class BeneficiaryNotFoundException extends Error {
  constructor() {
    super(`Beneficiary not found`);
  }
}
