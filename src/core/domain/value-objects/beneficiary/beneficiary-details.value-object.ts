import { BeneficiaryDocument } from './beneficiary-document.type';
import { BeneficiaryAddress } from './beneficiary-address.type';

export class BeneficiaryDetailsValueObject {
  public constructor(
    public firstName: string,
    public lastName: string,
    public isSelfEmployed: boolean,
    public birthDate: string,
    public birthPlace: string,
    public citizenship: string,
    public phoneNumber: string,
    public email: string,
    public documents: BeneficiaryDocument[],
    public addresses: BeneficiaryAddress[],
    public inn?: string,
    public snils?: string,
    public middleName?: string,
  ) {}

  public toJSON(): Record<string, any> {
    return {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      isSelfEmployed: this.isSelfEmployed,
      birthDate: this.birthDate,
      birthPlace: this.birthPlace,
      citizenship: this.citizenship,
      phoneNumber: this.phoneNumber,
      email: this.email,
      documents: this.documents,
      addresses: this.addresses,
      inn: this.inn,
      snils: this.snils,
    };
  }

  public static fromJSON(
    data: Record<string, any>,
  ): BeneficiaryDetailsValueObject {
    return new BeneficiaryDetailsValueObject(
      data.firstName,
      data.lastName,
      data.isSelfEmployed,
      data.birthDate,
      data.birthPlace,
      data.citizenship,
      data.phoneNumber,
      data.email,
      data.documents,
      data.addresses,
      data.inn,
      data.snils,
      data.middleName,
    );
  }
}
