export class ClientAlreadySignedContractException extends Error {
  constructor() {
    super(`The client has already signed the contract`);
  }
}
