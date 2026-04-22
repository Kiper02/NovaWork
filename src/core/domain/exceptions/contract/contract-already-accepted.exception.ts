export class ContractAlreadyAcceptedException extends Error {
  constructor() {
    super(
      `Cannot change contract amount after it has been accepted by any party`,
    );
  }
}
