import { Injectable } from '@nestjs/common';
import { BankDetailsRepository } from '../../../../domain/repositories/finance/bank-details.repository';
import { BeneficiaryPort } from '../../../../ports/bank-payment/beneficiary/beneficiary.port';
import { ICreateBankDetailsCommand } from './create-bank-details.command';
import { BeneficiaryRepository } from '../../../../domain/repositories/finance/beneficiary.repository';
import { BeneficiaryNotFoundException } from '../../../../domain/exceptions/beneficiary/beneficiary-not-found.exception';
import {
  BankDetailsEntity,
  EnumBankDetailsType,
} from '../../../../domain/entities/finance/bank-details.entity';
import {v4 as uuid} from 'uuid';
import {
  IAddCardDetailsRequest,
  IAddPaymentDetailsRequest,
  IAddSbpDetailsRequest,
} from '../../../../ports/bank-payment/beneficiary/types/bank-details.type';
import { BankDetailsValueObject } from '../../../../domain/value-objects/bank-details/bank-details.value-object';
import { MissingCardDetailsException } from '../../../../domain/exceptions/bank-details/missing-card-details.exception';
import { MissingSbpDetailsException } from '../../../../domain/exceptions/bank-details/missing-sbp-details.exception';
import {
  MissingPaymentDetailsException
} from '../../../../domain/exceptions/bank-details/missing-payment-details.exception';
import {
  BankDetailsCreationFailedException
} from '../../../../domain/exceptions/bank-details/bank-details-creation-failed.exception';


@Injectable()
export class CreateBankDetailsUseCase {
  constructor(
    private readonly bankDetailsRepository: BankDetailsRepository,
    private readonly beneficiaryRepository: BeneficiaryRepository,
    private readonly beneficiaryPort: BeneficiaryPort,
  ) {}

  public async execute(command: ICreateBankDetailsCommand) {
    try {
      const beneficiary = await this.beneficiaryRepository.findById(
        command.beneficiaryId,
      );
      if (!beneficiary) throw new BeneficiaryNotFoundException();

      const portDetails = this.preparePortDetails(command);
      const detailsValueObject = await this.createDetailsValueObject(
        command,
        portDetails,
      );

      const entity = new BankDetailsEntity(
        uuid(),
        beneficiary.id,
        command.type,
        detailsValueObject,
        command.isDefault,
        new Date(),
        new Date(),
      );
      return this.bankDetailsRepository.save(entity);
    } catch (e) {
      throw new BankDetailsCreationFailedException(
        'Bank details creation failed',
      );
    }
  }

  private preparePortDetails(command: ICreateBankDetailsCommand) {
    switch (command.type) {
      case EnumBankDetailsType.CARD:
        if (!command.card) throw new MissingCardDetailsException()
        return {
          pan: command.card.pan,
          expiryDate: command.card.expiryDate,
          cardHolder: command.card.cardHolder,
          cvv: command.card.cvv,
        } as IAddCardDetailsRequest;
      case EnumBankDetailsType.SBP:
        if (!command.sbp) throw new MissingSbpDetailsException();
        return {
          phoneNumber: command.sbp.phoneNumber,
          bankId: command.sbp.bankId,
        } as IAddSbpDetailsRequest;
      case EnumBankDetailsType.PAYMENT_DETAILS:
        if (!command.payment) throw new MissingPaymentDetailsException();
        return {
          bik: command.payment.bik,
          bankName: command.payment.bankName,
          accountNumber: command.payment.accountNumber,
          corrAccountNumber: command.payment.corrAccountNumber,
          inn: command.payment.inn,
          kpp: command.payment.kpp,
          name: command.payment.name,
        } as IAddPaymentDetailsRequest;
    }
  }

  private async createDetailsValueObject(
    command: ICreateBankDetailsCommand,
    portDetails:
      | IAddCardDetailsRequest
      | IAddSbpDetailsRequest
      | IAddPaymentDetailsRequest,
  ): Promise<BankDetailsValueObject> {
    const bankResponse = await this.beneficiaryPort.addBankDetails(
      command.beneficiaryId,
      command.type,
      portDetails,
      command.isDefault,
    );

    switch (command.type) {
      case EnumBankDetailsType.CARD: {
        const card = portDetails as IAddCardDetailsRequest;
        const expiry = BankDetailsValueObject.parseExpiryDate(card.expiryDate);
        return BankDetailsValueObject.createCard({
          bankDetailsId: bankResponse.bankDetailsId,
          cardId: bankResponse.cardId,
          maskedPan: BankDetailsValueObject.maskPan(card.pan),
          expiryMonth: expiry?.month,
          expiryYear: expiry?.year,
          cardHolder: card.cardHolder,
          isDefault: bankResponse.isDefault,
        });
      }
      case EnumBankDetailsType.SBP: {
        const sbp = portDetails as IAddSbpDetailsRequest;
        return BankDetailsValueObject.createSbp({
          bankDetailsId: bankResponse.bankDetailsId,
          maskedPhone: BankDetailsValueObject.maskPhone(sbp.phoneNumber),
          bankId: sbp.bankId,
          isDefault: bankResponse.isDefault,
        });
      }
      case EnumBankDetailsType.PAYMENT_DETAILS: {
        const payment = portDetails as IAddPaymentDetailsRequest;
        return BankDetailsValueObject.createPayment({
          bankDetailsId: bankResponse.bankDetailsId,
          maskedAccount: BankDetailsValueObject.maskAccount(
            payment.accountNumber,
          ),
          bankName: payment.bankName,
          bik: payment.bik,
          isDefault: bankResponse.isDefault,
        });
      }
    }
  }
}