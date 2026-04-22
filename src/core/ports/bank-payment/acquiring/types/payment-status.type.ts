export interface IPaymentStatusPortResultType {
  paymentId: string;
  status:
    | 'NEW'
    | 'FORM_SHOWED'
    | 'DEADLINE_EXPIRED'
    | 'CANCELED'
    | 'PREAUTHORIZING'
    | 'AUTHORIZING'
    | 'AUTHORIZED'
    | 'CONFIRMING'
    | 'CONFIRMED'
    | 'REJECTED'
    | 'REFUNDED'
    | 'PARTIAL_REFUNDED';
  paid: boolean;
  amount?: number;
}
