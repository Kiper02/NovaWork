export class InsufficientFundsException extends Error {
  constructor() {
    super(`There are not enough funds in your balance`);
  }
}
