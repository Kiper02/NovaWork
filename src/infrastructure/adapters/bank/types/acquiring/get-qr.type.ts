/**
 * Запрос получения QR-кода СБП (метод /v2/GetQr)
 */
export interface ITinkoffGetQrRequest {
  PaymentId: number;
  DataType: 'PAYLOAD' | 'IMAGE';
}

export interface ITinkoffGetQrResponse {
  TerminalKey: string;
  Amount: number;
  OrderId: string;
  Success: boolean;
  Data: string;
  PaymentId: string;
  ErrorCode: string;
  Message?: string;
  Details?: string;
  RequestKey: string;
}

export interface ITinkoffGetBankListRequest {
  TerminalKey: string;
  ScenarioType?: 'qr' | 'sub';
  Device: {
    Type: 'mobile' | 'desktop';
    Os?: string;
  };
  Token: string;
}

export interface ITinkoffGetQrBankListResponse {
  Success: boolean;
  ErrorCode: string
  Message: string;
  BankList: ITinkoffQrBank[]
}

export interface ITinkoffQrBank {
  BankId: string;
  NspkBankId: string;
  BankName: string;
  BankLogo: string;
  BankOrder: number;
}