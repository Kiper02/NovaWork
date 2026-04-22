/**
 * Параметры выплаты (метод /v1/nominal-accounts/payments)
 */
export interface IPayment {
  type: 'REGULAR' | 'TAX';
  beneficiaryId: string;
  accountNumber: string; // номер номинального счёта
  bankDetailsId: string;
  amount: number; // в рублях
  purpose: string; // назначение платежа
}

export interface IBankDetails {
  type: string;
  bik: string;
  kpp: string;
  inn: string;
  name: string;
  bankName: string;
  corrAccountNumber: string;
}

export interface IPaymentResponseSuccess {
  type: 'REGULAR' | 'TAX';
  paymentId: string;
  beneficiaryId: string;
  accountNumber: string;
  bankDetails: IBankDetails;
  dealId: string;
  stepId: string;
  recipientId: string;
  amount: number;
  status: string;
  purpose: string;
  operationId: string;
}
