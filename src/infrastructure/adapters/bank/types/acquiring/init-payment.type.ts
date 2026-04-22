import {
  EnumAgentSign,
  EnumFFDVersion,
  EnumLanguageInitPayment,
  EnumPayType,
  EnumPaymentMethod,
  EnumPaymentObject,
  EnumTax,
  EnumTaxation,
} from './enums.type';
import { IMarkCode, IMarkQuantity, ISectoralItemProps } from './receipt.type';

// ==================== Запрос Init ====================

/**
 * Параметры инициализации платежа (метод /v2/Init)
 */
export interface ITinkoffInitPayment {
  Amount: number; // Сумма в копейках
  OrderId: string; // ID заказа в системе
  Description?: string;
  CustomerKey?: string; // ID покупателя
  Recurrent?: string; // 'Y' – сохранить карту для рекуррентных платежей
  PayType?: EnumPayType; // O – одностадийная, T – двухстадийная
  Language?: EnumLanguageInitPayment;
  NotificationURL?: string; // URL для вебхуков
  SuccessURL?: string;
  FailURL?: string;
  RedirectDueDate?: Date; // Срок жизни ссылки/QR
  Receipt?: IInitPaymentReceipt; // Данные чека (если нужна онлайн-касса)
  Shops?: IInitPaymentShop[]; // Для маркетплейсов
}

/**
 * Ответ на Init
 */
export interface ITinkoffInitPaymentResponse {
  Success: boolean;
  ErrorCode: string;
  TerminalKey: string;
  Status: string;
  PaymentId: string;
  OrderId: string;
  Amount: number;
  PaymentURL: string; // Ссылка на платёжную форму
}

// ==================== Чек (Receipt) ====================

export interface IInitPaymentReceiptBase {
  FfdVersion: EnumFFDVersion;
  Taxation: EnumTaxation;
  Email: string; // Email клиента (если нет Phone)
  Phone: string; // Телефон клиента (если нет Email)
}

export interface IInitPaymentReceiptFFD105 extends IInitPaymentReceiptBase {
  Payments: IReceiptPayment[];
}

export interface IInitPaymentReceiptFFD12 extends IInitPaymentReceiptBase {
  ClientInfo: IClientInfo;
  Customer: string; // Идентификатор/имя клиента
  CustomerInn: string;
  Items: IReceiptItem[];
  Payments: IReceiptPayment[];
  OperatingСheckProps?: any;
  SectoralCheckProps?: any;
  AddUserProp?: any;
  AdditionalCheckProps?: any;
}

export type IInitPaymentReceipt =
  | IInitPaymentReceiptFFD105
  | IInitPaymentReceiptFFD12;

// ==================== Элементы чека ====================

export interface IReceiptItem {
  AgentData?: IReceiptItemAgentData;
  SupplierInfo?: ISupplierInfo;
  Name: string;
  Price: number; // Цена в копейках
  Quantity: number;
  Amount: number; // Price * Quantity
  Tax: EnumTax;
  PaymentMethod: EnumPaymentMethod;
  PaymentObject: EnumPaymentObject;
  UserData?: string;
  Excise?: string;
  CountryCode?: string;
  DeclarationNumber?: string;
  MeasurementUnit: string;
  MarkProcessingMode?: string;
  MarkCode: IMarkCode;
  MarkQuantity: IMarkQuantity;
  SectoralItemProps?: ISectoralItemProps[];
}

export interface IReceiptItemAgentData {
  AgentSign?: EnumAgentSign;
  OperationName?: string;
  Phones?: string;
  ReceiverPhones: string;
  TransferPhones?: string;
  OperatorName?: string;
  OperatorAddress?: string;
  OperatorInn?: string;
}

export interface ISupplierInfo {
  Phones?: string;
  Name?: string;
  Inn?: string;
}

export interface IReceiptPayment {
  Cash?: number; // Наличные (копейки)
  Electronic: number; // Безналичный
  AdvancePayment?: number;
  Credit?: number;
  Provision?: number;
}

export interface IClientInfo {
  Birthdate: string; // ДД.ММ.ГГГГ
  Citizenship: string; // Цифровой код страны ОКСМ
  DocumentСode: string; // 21 – паспорт РФ
  DocumentData: string; // Серия и номер
  Address: string;
}

// ==================== Маркетплейс ====================

export interface IInitPaymentShop {
  ShopCode: string;
  Amount: number; // Сумма в копейках, относящаяся к магазину
  Name: string;
  Fee?: string; // Комиссия в копейках
}
