export interface IGetQrPortRequest {
  paymentId: string;
  dataType?: 'PAYLOAD' | 'IMAGE';
}

export interface IGetQrPortResponse {
  data: string;
}

export interface IGetQrBankListRequest {
  scenarioType?: 'qr' | 'sub'
  device: {
    type: 'desktop' | 'mobile',
    os?: string;
  }
}

export interface IGetQrBankListResponse {
  bankId: string;
  nspkBankId: string;
  bankName: string;
  bankLogo: string;
  bankOrder: number;
}