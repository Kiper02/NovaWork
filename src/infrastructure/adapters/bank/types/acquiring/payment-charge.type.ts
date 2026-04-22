/**
 * Параметры списания по сохранённой карте (метод /v2/Charge)
 */
export interface ITinkoffPaymentCharge {
  PaymentId: string;
  RebillId: string; // ID сохранённых реквизитов карты
  IP?: string;
  SendEmail?: boolean;
  InfoEmail?: string;
}

export interface ITinkoffPaymentChargeResponse {
  TerminalKey: string;
  Amount: number;
  OrderId: string;
  Success: boolean;
  Status: 'CONFIRMED' | 'REJECTED';
  PaymentId: string;
  ErrorCode: string;
  Message?: string;
  Details?: string;
}
