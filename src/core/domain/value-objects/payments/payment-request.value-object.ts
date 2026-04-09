export class PaymentRequestValueObject {
  public constructor(
    public readonly amount: number,
    public readonly currency: string,
    public readonly beneficiaryId: string,
    public readonly purpose: string,
  ) {}
}