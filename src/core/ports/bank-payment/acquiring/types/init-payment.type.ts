export interface IInitPaymentPortRequestType {
  /** Сумма в рублях (например, 100.50) */
  amount: number;
  /** Внутренний ID транзакции или заказа */
  orderId: string;
  /** Описание платежа (показывается пользователю) */
  description?: string;
  /** Идентификатор пользователя в вашей системе */
  customerKey?: string;
  /** Запросить сохранение карты для будущих списаний */
  saveCard?: boolean;
  /** URL, куда вернуть пользователя после успешной оплаты */
  returnUrl?: string;
  /** URL, куда вернуть пользователя при ошибке */
  failUrl?: string;
  /** URL для уведомлений (вебхук) */
  notificationUrl?: string;
}

export interface IInitPaymentPortResultType {
  /** Внешний ID платежа в системе банка */
  paymentId: string;
  /** Ссылка на платёжную форму (если оплата через форму) */
  paymentUrl?: string;
}
