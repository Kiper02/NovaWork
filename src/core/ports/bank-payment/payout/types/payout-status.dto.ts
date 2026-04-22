export interface IPayoutStatusPortResultType {
  externalId: string;
  status: 'PENDING' | 'PROCESSED' | 'FAILED';
  errorMessage?: string;
}
