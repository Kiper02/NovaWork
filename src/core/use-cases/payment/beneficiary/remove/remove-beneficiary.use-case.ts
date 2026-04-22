import { Injectable } from '@nestjs/common';
import { AccessControlService } from '../../../../domain/services/authorization/access-control.service';
import { IRemoveBeneficiaryCommand } from './remove-beneficiary.command';
import {
  BeneficiaryNotFoundException
} from '../../../../domain/exceptions/beneficiary/beneficiary-not-found.exception';
import {
  DELETE_RESOURCES,
} from '../../../../domain/constants/roles.constants';
import { BeneficiaryQueryRepository } from '../../../../domain/repositories/finance/beneficiary-query.repository';
import {
  BeneficiaryRemoveForbiddenException
} from '../../../../domain/exceptions/beneficiary/beneficiary-remove-forbidden.exception';
import { BeneficiaryRepository } from '../../../../domain/repositories/finance/beneficiary.repository';

@Injectable()
export class RemoveBeneficiaryUseCase {
  public constructor(
    private accessControlService: AccessControlService,
    private beneficiaryQueryRepository: BeneficiaryQueryRepository,
    private beneficiaryRepository: BeneficiaryRepository
  ) {}

  public async execute(command: IRemoveBeneficiaryCommand) {
    const beneficiary = await this.beneficiaryQueryRepository.findByIdForDetails(
      command.beneficiaryId,
    );
    if (!beneficiary) {
      throw new BeneficiaryNotFoundException();
    }

    await this.accessControlService.checkAccessOrThrow(
      command.userId,
      DELETE_RESOURCES,
      beneficiary.user.id,
      new BeneficiaryRemoveForbiddenException(),
    );

    return this.beneficiaryRepository.remove(command.beneficiaryId);
  }
}
