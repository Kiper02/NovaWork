/**
 * Типы документов и адресов для полной анкеты бенефициара
 */
export enum EnumTinkoffBeneficiaryDocumentType {
  PASSPORT = 'PASSPORT',
  FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
  FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS = 'FOREIGN_PASSPORT_OF_FOREIGN_CITIZENS',
  OFFICIAL_PASSPORT = 'OFFICIAL_PASSPORT',
  DIPLOMATIC_PASSPORT = 'DIPLOMATIC_PASSPORT',
  MIGRATION_CARD = 'MIGRATION_CARD',
  TEMPORARY_RESIDENCE_PERMIT = 'TEMPORARY_RESIDENCE_PERMIT',
  VISA = 'VISA',
  RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
  CONTRACT = 'CONTRACT',
  CONTRACT_GPD = 'CONTRACT_GPD',
  PATENT = 'PATENT',
}

export enum EnumTinkoffBeneficiaryAddressType {
  POSTAL_ADDRESS = 'POSTAL_ADDRESS',
  REGISTRATION_ADDRESS = 'REGISTRATION_ADDRESS',
  RESIDENCE_ADDRESS = 'RESIDENCE_ADDRESS',
  LEGAL_ENTITY_ADDRESS = 'LEGAL_ENTITY_ADDRESS',
  OFFICE_OF_FOREIGN_LEGAL_ENTITY_ADDRESS = 'OFFICE_OF_FOREIGN_LEGAL_ENTITY_ADDRESS',
}

export interface ITinkoffBeneficiaryDocument {
  type: EnumTinkoffBeneficiaryDocumentType;
  number: string;
  date: string; // Дата выдачи (ДД.ММ.ГГГГ)
  expireDate?: string;
  organization?: string;
  serial?: string;
  division?: string;
}

export interface ITinkoffBeneficiaryAddress {
  type: EnumTinkoffBeneficiaryAddressType;
  address: string;
}

/**
 * Полная анкета бенефициара (ФЛ, ИП, юрлицо)
 */
export interface ITinkoffCreateFullBeneficiary {
  type:
    | 'FL_RESIDENT'
    | 'FL_NONRESIDENT'
    | 'UL_RESIDENT'
    | 'UL_NONRESIDENT'
    | 'IP_RESIDENT'
    | 'IP_NONRESIDENT';
  firstName: string;
  middleName?: string;
  lastName: string;
  isSelfEmployed: boolean;
  birthDate: string;
  birthPlace: string;
  citizenship: string;
  phoneNumber: string;
  email: string;
  documents: ITinkoffBeneficiaryDocument[];
  addresses: ITinkoffBeneficiaryAddress[];
  inn?: string;
  snils?: string;
}

/**
 * Лёгкий контакт (только тип)
 */
export interface ITinkoffCreateLiteContactBeneficiary {
  type: 'LITE_CONTACT';
}

export type ITinkoffCreateBeneficiary =
  | ITinkoffCreateLiteContactBeneficiary
  | ITinkoffCreateFullBeneficiary;

export interface ITinkoffCreateBeneficiaryResponse extends ITinkoffCreateFullBeneficiary {
  beneficiaryId: string;
}

/**
 * Type guard для проверки, является ли запрос лёгким контактом
 */
export function isLiteContact(
  data: ITinkoffCreateBeneficiary,
): data is ITinkoffCreateLiteContactBeneficiary {
  return data.type === 'LITE_CONTACT';
}
