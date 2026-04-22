export interface ICreatePayoutPortRequestType {
  beneficiaryId: string;
  bankDetailsId: string;
  amount: number; // в рублях
  orderId: string;
  purpose?: string;
}

export interface IPayoutPortResultType {
  externalId: string;
  status: 'PENDING' | 'PROCESSED' | 'FAILED';
}
