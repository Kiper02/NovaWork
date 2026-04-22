export enum EnumTinkoffCheckBeneficiaryCode {
  INVALID_INN = 'INVALID_INN',
  INVALID_PASSPORT = 'INVALID_PASSPORT',
  IN_BLACKLIST = 'IN_BLACKLIST',
  UL_CLOSED = 'UL_CLOSED',
  UL_NOT_FOUND = 'UL_NOT_FOUND',
}

export interface ITinkoffCheckBeneficiaryQueryParams {
  beneficiaryId?: string;
  passed?: string; // true/false
  offset?: number;
  limit?: number;
}

export interface ITinkoffCheckBeneficiaryScoringResponse {
  offset: string;
  limit: string;
  size: string;
  total: string;
  result: ITinkoffCheckBeneficiaryScoringResponseData[];
}

export interface ITinkoffCheckBeneficiaryScoringResponseData {
  beneficiaryId: string;
  status: 'SUCCEEDED' | 'FAILED';
  warnings?: Array<{
    code: EnumTinkoffCheckBeneficiaryCode;
    description: string;
  }>;
}
