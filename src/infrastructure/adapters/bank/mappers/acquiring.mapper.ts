import {
  IInitPaymentPortRequestType,
  IInitPaymentPortResultType,
} from '../../../../core/ports/bank-payment/acquiring/types/init-payment.type';
import {
  ITinkoffInitPayment,
  ITinkoffInitPaymentResponse,
} from '../types/acquiring/init-payment.type';
import { IChargePaymentPortRequestType, IChargePaymentPortResultType } from '../../../../core/ports/bank-payment/acquiring/types/charge-payment.type';
import {
  ITinkoffPaymentCharge,
  ITinkoffPaymentChargeResponse,
} from '../types/acquiring/payment-charge.type';
import { IGetQrBankListRequest, IGetQrBankListResponse } from '../../../../core/ports/bank-payment/acquiring/types/get-qr.type';
import {
  ITinkoffGetBankListRequest,
  ITinkoffGetQrBankListResponse, ITinkoffQrBank,
} from '../types/acquiring/get-qr.type';

export class AcquiringMapper {
  public static toTinkoffInitPaymentRequest(
    data: IInitPaymentPortRequestType,
  ): ITinkoffInitPayment {
    return {
      Amount: Math.round(data.amount * 100),
      OrderId: data.orderId,
      Description: data.description,
      CustomerKey: data.customerKey,
      Recurrent: data.saveCard ? 'Y' : 'N',
      NotificationURL: data.notificationUrl,
      SuccessURL: data.returnUrl,
      FailURL: data.failUrl,
    };
  }

  public static toInitPaymentPortResult(
    tinkoffResponse: ITinkoffInitPaymentResponse,
  ): IInitPaymentPortResultType {
    return {
      paymentId: tinkoffResponse.PaymentId,
      paymentUrl: tinkoffResponse.PaymentURL,
    };
  }

  public static toTinkoffPaymentChargeRequest(
    data: IChargePaymentPortRequestType,
  ): ITinkoffPaymentCharge {
    return {
      PaymentId: data.paymentId,
      RebillId: data.rebillId,
    };
  }

  public static toPaymentChargePortResult(
    tinkoffResponse: ITinkoffPaymentChargeResponse,
  ): IChargePaymentPortResultType {
    return {
      success: tinkoffResponse.Success,
      status: tinkoffResponse.Status,
    };
  }

  public static toGetQrBankListRequest(
    data: IGetQrBankListRequest,
  ): Omit<ITinkoffGetBankListRequest, 'Token' | 'TerminalKey'> {
    return {
      ScenarioType: data.scenarioType,
      Device: {
        Type: data.device.type,
        Os: data.device.os,
      },
    };
  }

  public static toGetQrBankListPortResult(
    bank: ITinkoffQrBank,
  ): IGetQrBankListResponse {
    return {
      bankId: bank.BankId,
      nspkBankId: bank.NspkBankId,
      bankName: bank.BankName,
      bankLogo: bank.BankLogo,
      bankOrder: bank.BankOrder,
    };
  }
}
