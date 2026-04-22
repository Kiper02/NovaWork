import {
  IInitPaymentPortRequestType,
  IInitPaymentPortResultType,
} from './types/init-payment.type';
import {
  IChargePaymentPortRequestType,
  IChargePaymentPortResultType,
} from './types/charge-payment.type';
import {
  IGetQrBankListRequest,
  IGetQrBankListResponse,
} from './types/get-qr.type';

export abstract class AcquiringPort {
  /**
   * Создать платёж в платёжной системе.
   * @returns объект с внешним ID платежа и ссылкой для редиректа (или QR-кодом)
   */
  public abstract initiatePayment(
    data: IInitPaymentPortRequestType,
  ): Promise<IInitPaymentPortResultType>;

  /**
   * Провести списание по сохранённой карте (rebill).
   * Обычно используется после того, как пользователь сохранил карту через первый платёж.
   */
  public abstract chargePayment(
    data: IChargePaymentPortRequestType,
  ): Promise<IChargePaymentPortResultType>;

  /**
   * Получить список банков-участников СБП для платежа
   */
  public abstract getQrBankList(
    data: IGetQrBankListRequest,
  ): Promise<IGetQrBankListResponse[]>;
}
