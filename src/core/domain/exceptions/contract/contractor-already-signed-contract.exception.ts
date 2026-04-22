export class ContractorAlreadySignedContractException extends Error {
  constructor() {
    super(`The contractor has already signed the contract`);
  }
}
