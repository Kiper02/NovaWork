export class ContractAmbiguousException extends Error {
  constructor() {
    super(`An ambiguous contract`);
  }
}
