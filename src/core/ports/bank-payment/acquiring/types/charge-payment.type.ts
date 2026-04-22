export interface IChargePaymentPortRequestType {
  /** Внешний ID платежа, полученный при инициализации */
  paymentId: string;
  /** ID сохранённых реквизитов карты (rebillId) */
  rebillId: string;
}

export interface IChargePaymentPortResultType {
  success: boolean;
  status: 'CONFIRMED' | 'REJECTED' | 'AUTHORIZED';
}
