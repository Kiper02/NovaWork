export class BankDetailsNotFoundException extends Error {
  constructor() {
    super(`Bank details not found`);
  }
}
