import { Beneficiary, Prisma } from '@prisma/client';
import {
  BeneficiaryEntity,
  EnumBeneficiaryType,
} from '../../../../../core/domain/entities/finance/beneficiary.entity';
import {
  BeneficiaryDetailsValueObject
} from '../../../../../core/domain/value-objects/beneficiary/beneficiary-details.value-object';

export class BeneficiaryMapper {
  public static toEntity(model: Beneficiary): BeneficiaryEntity {

    const detailsValueObject = BeneficiaryDetailsValueObject.fromJSON(model.details as unknown as Record<string, any>);

    return new BeneficiaryEntity(
      model.id,
      model.accountId,
      model.type as EnumBeneficiaryType,
      model.externalId,
      detailsValueObject,
      model.createdAt,
      model.updatedAt
    )
  }

  public static toModel(entity: BeneficiaryEntity): Prisma.BeneficiaryCreateInput {
    return {
      id: entity.id,
      type: entity.type,
      details: entity.details,
      externalId: entity.externalId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      account: {
        connect: {
          id: entity.accountId,
        }
      }
    }
  }

  public static toUpdateModel(entity: BeneficiaryEntity) {
    const result: Prisma.BeneficiaryUpdateInput = {}

    if (entity.type) result.type = entity.type;
    if (entity.details) result.details = entity.details.toJSON();
    if (entity.updatedAt) result.updatedAt = entity.updatedAt;

    return result;
  }
}