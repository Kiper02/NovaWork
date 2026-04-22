import {
  EnumTinkoffBeneficiaryAddressType,
  EnumTinkoffBeneficiaryDocumentType,
  ITinkoffBeneficiaryAddress,
  ITinkoffBeneficiaryDocument,
  ITinkoffCreateBeneficiaryResponse,
  ITinkoffCreateFullBeneficiary,
} from '../types/beneficiary/create-beneficiary.type';
import {
  IScoringStatusPortResult,
  IScoringStatusQueryParams,
} from '../../../../core/ports/bank-payment/beneficiary/types/scoring-status.type';
import {
  ITinkoffCheckBeneficiaryQueryParams,
  ITinkoffCheckBeneficiaryScoringResponseData
} from '../types/beneficiary/check-beneficiary-scoring.type';
import {
  BeneficiaryDetailsValueObject
} from '../../../../core/domain/value-objects/beneficiary/beneficiary-details.value-object';
import { BeneficiaryDocument } from '../../../../core/domain/value-objects/beneficiary/beneficiary-document.type';
import { BeneficiaryAddress } from '../../../../core/domain/value-objects/beneficiary/beneficiary-address.type';
import { EnumBeneficiaryType } from '../../../../core/domain/entities/finance/beneficiary.entity';
import { EnumBankDetailsType } from '../../../../core/domain/entities/finance/bank-details.entity';
import {
  EnumTinkoffBankDetailsType,
  ITinkoffBankDetailsResponse,
  ITinkoffCreateBankDetails,
} from '../types/beneficiary/bank-details.type';
import { IBeneficiaryPortResult } from '../../../../core/ports/bank-payment/beneficiary/types/create-beneficiary.type';
import {
  IAddCardDetailsRequest, IAddPaymentDetailsRequest,
  IAddSbpDetailsRequest, IBankDetailsPortResponse
} from '../../../../core/ports/bank-payment/beneficiary/types/bank-details.type';

export class BeneficiaryMapper {
  public static toTinkoffCreateBeneficiaryRequest(
    type: EnumBeneficiaryType,
    vo: BeneficiaryDetailsValueObject,
  ): ITinkoffCreateFullBeneficiary {
    return {
      type: type as ITinkoffCreateFullBeneficiary['type'],
      firstName: vo.firstName,
      middleName: vo.middleName,
      lastName: vo.lastName,
      isSelfEmployed: vo.isSelfEmployed,
      birthDate: vo.birthDate,
      birthPlace: vo.birthPlace,
      citizenship: vo.citizenship,
      phoneNumber: vo.phoneNumber,
      email: vo.email,
      documents: vo.documents.map(this.toTinkoffDocument),
      addresses: vo.addresses.map(this.toTinkoffAddress),
      // inn: vo.inn ?? '',
      // snils: vo.snils ?? '',
    };
  }

  private static toTinkoffDocument(
    doc: BeneficiaryDocument,
  ): ITinkoffBeneficiaryDocument {
    switch (doc.type) {
      case 'PASSPORT':
        return {
          type: EnumTinkoffBeneficiaryDocumentType.PASSPORT,
          serial: doc.serial,
          number: doc.number,
          date: doc.date,
          organization: doc.organization,
          division: doc.division,
        };
      case 'FOREIGN_PASSPORT':
        return {
          type: EnumTinkoffBeneficiaryDocumentType.FOREIGN_PASSPORT,
          number: doc.number,
          date: doc.date,
          organization: doc.organization,
        };
      case 'CONTRACT_GPD':
        return {
          type: EnumTinkoffBeneficiaryDocumentType.CONTRACT_GPD,
          number: doc.number,
          date: doc.date,
          expireDate: doc.expireDate,
        };
      default:
        throw new Error(`Unknown document type: ${(doc as any).type}`);
    }
  }

  private static toTinkoffAddress(
    addr: BeneficiaryAddress,
  ): ITinkoffBeneficiaryAddress {
    return {
      type: addr.type as unknown as EnumTinkoffBeneficiaryAddressType,
      address: addr.address,
    };
  }

  public static toCreateBeneficiaryPortResult(
    data: ITinkoffCreateBeneficiaryResponse,
  ): IBeneficiaryPortResult {
    return {
      beneficiaryId: data.beneficiaryId,
    };
  }

  public static toTinkoffGetScoringStatusRequest(
    params: IScoringStatusQueryParams,
  ): ITinkoffCheckBeneficiaryQueryParams {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    return {
      beneficiaryId: params.beneficiaryId,
      passed: String(params.passed),
      offset: (page - 1) * limit,
      limit: limit,
    };
  }

  public static toGetScoringStatusPortResult(
    data: ITinkoffCheckBeneficiaryScoringResponseData,
  ): IScoringStatusPortResult {
    return {
      beneficiaryId: data.beneficiaryId,
      status: data.status,
      warnings: data.warnings?.map((warning) => ({
        code: warning.code,
        description: warning.description,
      })),
    };
  }


  public static toAddBankDetailsPortResult(data: ITinkoffBankDetailsResponse): IBankDetailsPortResponse {
    return {
      beneficiaryId: data.beneficiaryId,
      bankDetailsId: data.bankDetailsId,
      isDefault: data.isDefault ?? false,
      type: data.type as unknown as EnumBankDetailsType,
    };
  }
}
