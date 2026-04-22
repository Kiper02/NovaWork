export enum EnumBeneficiaryDocumentType {
  PASSPORT = 'PASSPORT',
  FOREIGN_PASSPORT = 'FOREIGN_PASSPORT',
  CONTRACT_GPD = 'CONTRACT_GPD',
}

export interface BaseDocument {
  type: EnumBeneficiaryDocumentType
}

export interface PassportDocument extends BaseDocument {
  type: EnumBeneficiaryDocumentType.PASSPORT;
  serial: string;
  number: string;
  date: string;
  organization: string;
  division: string;
}

export interface ForeignPassportDocument extends BaseDocument {
  type: EnumBeneficiaryDocumentType.FOREIGN_PASSPORT;
  number: string;
  date: string;
  organization: string;
}

export interface ContractGPDDocument extends BaseDocument {
  type: EnumBeneficiaryDocumentType.CONTRACT_GPD;
  number: string;
  date: string;
  expireDate: string;
}

export type BeneficiaryDocument =
  | PassportDocument
  | ForeignPassportDocument
  | ContractGPDDocument;
