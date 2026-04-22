import {
  IPaginatedScoringStatusResult,
  IScoringStatusPortResult,
  IScoringStatusQueryParams,
} from './types/scoring-status.type';
import {
  BeneficiaryDetailsValueObject
} from '../../../domain/value-objects/beneficiary/beneficiary-details.value-object';
import { EnumBeneficiaryType } from '../../../domain/entities/finance/beneficiary.entity';
import { IBeneficiaryPortResult } from './types/create-beneficiary.type';
import {
  IAddCardDetailsRequest,
  IAddPaymentDetailsRequest,
  IAddSbpDetailsRequest,
  IBankDetailsPortResponse,
} from './types/bank-details.type';
import { IAddCardPortResult } from './types/add-card-request.type';
import { EnumBankDetailsType } from '../../../domain/entities/finance/bank-details.entity';

export abstract class BeneficiaryPort {
  /** Создать бенефициара (получателя выплат) */
  public abstract createBeneficiary(
    type: EnumBeneficiaryType,
    data: BeneficiaryDetailsValueObject,
  ): Promise<IBeneficiaryPortResult>;

  /** Получить статус скоринга для одного бенефициара */
  abstract getScoringStatus(
    beneficiaryId: string,
  ): Promise<IScoringStatusPortResult>;

  /** Получить список статусов скоринга с пагинацией */
  abstract getScoringStatuses(
    params: IScoringStatusQueryParams,
  ): Promise<IPaginatedScoringStatusResult>;

  /** Добавить банковские реквизиты (карту или счёт) для бенефициара */
  public abstract addBankDetails(
    beneficiaryId: string,
    type: EnumBankDetailsType,
    details:
      | IAddCardDetailsRequest
      | IAddSbpDetailsRequest
      | IAddPaymentDetailsRequest,
    isDefault: boolean,
  ): Promise<IBankDetailsPortResponse>;

  /** Установить реквизиты по умолчанию (для выплат) */
  public abstract setDefaultBankDetails(
    beneficiaryId: string,
    bankDetailsId: string,
  ): Promise<void>;

  /** Удалить реквизиты */
  public abstract deleteBankDetails(
    beneficiaryId: string,
    bankDetailsId: string,
  ): Promise<void>;

  /** Запросить добавление карты через виджет **/
  public abstract requestAddCard(
    beneficiaryId: string,
  ): Promise<IAddCardPortResult>;
}
