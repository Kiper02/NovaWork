import { ITinkoffCardData } from '../common/card-data.type';

export enum EnumSourcePayment {
  cards = 'cards',
  beeline = 'beeline',
  mts = 'mts',
  tele2 = 'tele2',
  megafon = 'megafon',
  einvoicing = 'einvoicing',
  webmoney = 'webmoney',
}

export enum EnumRouteFinishAuthorize {
  ACQ = 'ACQ', // cards
  MC = 'MC', // мобильные операторы
  EINV = 'EINV',
  WM = 'WM',
}

export interface IDataFinishAuthorize {
  threeDSCompInd: 'Y' | 'N' | 'U';
  language: string;
  timezone: string;
  screen_height: string;
  screen_width: string;
  cresCallbackUrl: string;
  colorDepth?: string;
  javaEnabled?: 'true' | 'false';
}

export interface IFinishAuthorize {
  PaymentId: string;
  IP?: string;
  SendEmail?: boolean;
  Source?: EnumSourcePayment;
  DATA?: IDataFinishAuthorize;
  InfoEmail?: string;
  EncryptedPaymentData?: string;
  CardData: ITinkoffCardData;
  Amount?: number;
  deviceChannel?: '01' | '02';
  Route?: EnumRouteFinishAuthorize;
}

export interface IBaseFinishAuthorizeResponse {
  TerminalKey: string;
  Amount: number;
  OrderId: string;
  Success: boolean;
  Status: 'CONFIRMED' | 'AUTHORIZED' | '3DS_CHECKING' | 'REJECTED';
  PaymentId?: string;
  ErrorCode: string;
  Message?: string;
  Details?: string;
  RebbilId?: string;
  CardId?: string;
}

export interface IFinishAuthorizeWithout3DSResponse extends IBaseFinishAuthorizeResponse {}
export interface IFinishAuthorizeWith3DSResponse extends IBaseFinishAuthorizeResponse {
  MD?: string;
  PaReq?: string;
  ACSUrl: string;
}
export interface IFinishAuthorizeWith3DSv2APPResponse extends IBaseFinishAuthorizeResponse {
  TdsServerTransId: string;
  AcsTransId: string;
  AcsInterface?: string;
  AcsUiTemplate?: string;
  AcsSignedContent?: string;
  AcsReferenceNumber: string;
  SdkTransID: string;
}
export interface IFinishAuthorizeWith3DSv2BRWResponse extends IBaseFinishAuthorizeResponse {
  TdsServerTransId: string;
  AcsTransId: string;
  ACSUrl?: string;
}

export type TypeFinishAuthorizeResponse =
  | IFinishAuthorizeWithout3DSResponse
  | IFinishAuthorizeWith3DSResponse
  | IFinishAuthorizeWith3DSv2APPResponse
  | IFinishAuthorizeWith3DSv2BRWResponse;
