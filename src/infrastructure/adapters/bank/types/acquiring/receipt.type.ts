import { EnumMarkCodeType } from './enums.type';

export interface IMarkCode {
  MarkCodeType: EnumMarkCodeType;
  Value: string;
}

export interface IMarkQuantity {
  Numerator?: number;
  Denominator?: number;
}

export interface ISectoralItemProps {
  FederalId: string;
  Date: string;
  Number: string;
  Value: string;
}
