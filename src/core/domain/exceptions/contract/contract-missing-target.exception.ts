export class ContractMissingTargetException extends Error {
  constructor() {
    super(`The target object is missing in the contract`);
  }
}
