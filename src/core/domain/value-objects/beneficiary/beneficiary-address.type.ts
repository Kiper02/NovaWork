export enum EnumBeneficiaryAddressType {
  REGISTRATION_ADDRESS = 'REGISTRATION_ADDRESS',
  RESIDENCE_ADDRESS = 'RESIDENCE_ADDRESS',
  POSTAL_ADDRESS = 'POSTAL_ADDRESS',
}

export interface BeneficiaryAddress {
  type: EnumBeneficiaryAddressType;
  address: string;
}
