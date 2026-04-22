import {
  BankDetailsEntity,
  EnumBankDetailsType,
} from '../../../../../core/domain/entities/finance/bank-details.entity';
import { BankDetails, Prisma } from '@prisma/client';
import {
  BankDetailsValueObject,
  CardDetails,
  PaymentDetails,
  SbpDetails,
} from '../../../../../core/domain/value-objects/bank-details/bank-details.value-object';

export class BankDetailsMapper {
  public static toEntity(model: BankDetails): BankDetailsEntity {
    const innerValue = model.details as any;

    let bankDetailsVO: BankDetailsValueObject;

    switch (model.type) {
      case 'CARD':
        bankDetailsVO = BankDetailsValueObject.createCard(
          innerValue as CardDetails,
        );
        break;
      case 'SBP':
        bankDetailsVO = BankDetailsValueObject.createSbp(
          innerValue as SbpDetails,
        );
        break;
      case 'PAYMENT_DETAILS':
        bankDetailsVO = BankDetailsValueObject.createPayment(
          innerValue as PaymentDetails,
        );
        break;
      default:
        throw new Error('Unknown type');
    }

    return new BankDetailsEntity(
      model.id,
      model.beneficiaryId,
      model.type as EnumBankDetailsType,
      bankDetailsVO,
      model.isDefault,
      model.createdAt,
      model.updatedAt,
    );
  }

  public static toModel(
    entity: BankDetailsEntity,
  ): Prisma.BankDetailsCreateInput {
    return {
      id: entity.id,
      type: entity.type,
      details: entity.details.getValue() as unknown as Prisma.InputJsonValue,
      isDefault: entity.isDefault,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      beneficiary: {
        connect: {
          id: entity.beneficiaryId,
        },
      },
    };
  }

  public static toUpdateModel(
    entity: Partial<Omit<BankDetailsEntity, 'id' | 'createdAt'>>,
  ): Prisma.BankDetailsUpdateInput {
    const result: Prisma.BankDetailsUpdateInput = {};

    if (entity.details)
      result.details = entity.details.getValue() as unknown as Prisma.InputJsonValue;
    if (entity.type) result.type = entity.type;
    if (entity.updatedAt) result.updatedAt = entity.updatedAt;

    return result;
  }
}
