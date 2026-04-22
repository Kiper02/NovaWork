import { BeneficiaryDetailsValueObject } from '../../value-objects/beneficiary/beneficiary-details.value-object';

export class BeneficiaryEntity {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly type: EnumBeneficiaryType,
    public readonly externalId: string | null,
    public readonly details: BeneficiaryDetailsValueObject,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}
export enum EnumBeneficiaryType {
  FL_RESIDENT = 'FL_RESIDENT', // физическое лицо, резидент.
  FL_NONRESIDENT = 'FL_NONRESIDENT', // физическое лицо, нерезидент.
  UL_RESIDENT = 'UL_RESIDENT', // юридическое лицо, резидент.
  UL_NONRESIDENT = 'UL_NONRESIDENT', // юридическое лицо, нерезидент.
  IP_RESIDENT = 'IP_RESIDENT', // ИП, резидент.
  IP_NONRESIDENT = 'IP_NONRESIDENT', // ИП, нерезидент.
  LITE_CONTACT = 'LITE_CONTACT', // легкий контакт.
}