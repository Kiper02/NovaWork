export class ContractNotFoundException extends Error {
  constructor() {
    super(`Contract not found`);
  }
}
