import { Injectable } from '@nestjs/common';
import { BeneficiaryQueryRepository } from '../../../../domain/repositories/finance/beneficiary-query.repository';
import { IUpdateBeneficiaryCommand } from './update-beneficiary.command';
import {
  BeneficiaryNotFoundException
} from '../../../../domain/exceptions/beneficiary/beneficiary-not-found.exception';
import {
  BeneficiaryRemoveForbiddenException
} from '../../../../domain/exceptions/beneficiary/beneficiary-remove-forbidden.exception';
import { AccessControlService } from '../../../../domain/services/authorization/access-control.service';
import { UPDATE_RESOURCES } from '../../../../domain/constants/roles.constants';
import { BeneficiaryRepository } from '../../../../domain/repositories/finance/beneficiary.repository';
import { BeneficiaryEntity } from '../../../../domain/entities/finance/beneficiary.entity';
import {
  BeneficiaryDetailsValueObject
} from '../../../../domain/value-objects/beneficiary/beneficiary-details.value-object';

@Injectable()
export class UpdateBeneficiaryUseCase {
  public constructor(
    private readonly beneficiaryQueryRepository: BeneficiaryQueryRepository,
    private accessControlService: AccessControlService,
    private beneficiaryRepository: BeneficiaryRepository
  ) {}

  public async execute(command: IUpdateBeneficiaryCommand) {
    const beneficiaryAggregate =
      await this.beneficiaryQueryRepository.findByIdForDetails(
        command.beneficiaryId,
      );
    if (!beneficiaryAggregate) throw new BeneficiaryNotFoundException();

    await this.accessControlService.checkAccessOrThrow(
      command.userId,
      UPDATE_RESOURCES,
      beneficiaryAggregate.user.id,
      new BeneficiaryRemoveForbiddenException(),
    );

    const beneficiary = beneficiaryAggregate.beneficiary;

    const newType = command.type ?? beneficiary.type;

    const current = beneficiary.details;
    const newDetails = new BeneficiaryDetailsValueObject(
      command.details?.firstName ?? current.firstName,
      command.details?.lastName ?? current.lastName,
      command.details?.isSelfEmployed ?? current.isSelfEmployed,
      command.details?.birthDate ?? current.birthDate,
      command.details?.birthPlace ?? current.birthPlace,
      command.details?.citizenship ?? current.citizenship,
      command.details?.phoneNumber ?? current.phoneNumber,
      command.details?.email ?? current.email,
      command.details?.documents ?? current.documents,
      command.details?.addresses ?? current.addresses,
      command.details?.inn ?? current.inn,
      command.details?.snils ?? current.snils,
      command.details?.middleName ?? current.middleName,
    );

    const updatedEntity = new BeneficiaryEntity(
      beneficiary.id,
      beneficiary.accountId,
      newType,
      beneficiary.externalId,
      newDetails,
      beneficiary.createdAt,
      new Date(),
    );

    return this.beneficiaryRepository.update(updatedEntity);
  }
}