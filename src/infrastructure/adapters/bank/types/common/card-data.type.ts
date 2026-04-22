/**
 * Данные банковской карты, используемые в некоторых запросах (например, при добавлении реквизитов или FinishAuthorize)
 */
export interface ITinkoffCardData {
  PAN: number; // Номер карты
  ExpDate: number; // Срок действия в формате MMYY
  CardHolder?: string;
  CVV?: string;
  ECI?: string; // Электронный идентификатор коммерции (для 3DS)
  CAVV?: string; // Проверочный код 3DS
}
