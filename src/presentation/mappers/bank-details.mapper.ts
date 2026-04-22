import { BadRequestException } from '@nestjs/common';
import {
  BankDetailsEntity,
  EnumBankDetailsType,
} from '../../core/domain/entities/finance/bank-details.entity';
import { CreateBankDetailsDto } from '../dto/bank-details/create-bank-details.dto';
import { BankDetailsResponseDto } from '../dto/bank-details/bank-details-response.dto';
import { CardDetailsResponseDto } from '../dto/bank-details/card-details-response.dto';
import { SbpDetailsResponseDto } from '../dto/bank-details/sbp-details-response.dto';
import { PaymentDetailsResponseDto } from '../dto/bank-details/payment-details-response.dto';
import { ICreateBankDetailsCommand } from '../../core/use-cases/payment/bank-details/create/create-bank-details.command';
import {
  CardDetails,
  SbpDetails,
  PaymentDetails,
} from '../../core/domain/value-objects/bank-details/bank-details.value-object';
import { FindAllBankDetailsQueryDto } from '../dto/bank-details/find-all-bank-details-query.dto';
import {
  IFindAllBankDetailsCommand
} from '../../core/use-cases/payment/bank-details/find-all/find-all-bank-details.command';
import { UpdateBankDetailsDto } from '../dto/bank-details/update-bank-details.dto';
import {
  IUpdateBankDetailsCommand
} from '../../core/use-cases/payment/bank-details/update/update-bank-details.command';
import {
  IFindBankDetailsByIdCommand
} from '../../core/use-cases/payment/bank-details/find-by-id/find-bank-details-by-id.command';
import {
  IDeleteBankDetailsCommand
} from '../../core/use-cases/payment/bank-details/delete/delete-bank-details.command';
import {
  IFindMyBankDetailsCommand
} from '../../core/use-cases/payment/bank-details/find-my/find-my-bank-details.command';

export class BankDetailsMapper {
  public static toCreateCommand(
    dto: CreateBankDetailsDto,
  ): ICreateBankDetailsCommand {
    const command: ICreateBankDetailsCommand = {
      beneficiaryId: dto.beneficiaryId,
      type: dto.type,
      isDefault: dto.isDefault ?? false,
    };

    switch (dto.type) {
      case EnumBankDetailsType.CARD:
        if (!dto.card) throw new BadRequestException('Card details required');
        command.card = { ...dto.card };
        break;
      case EnumBankDetailsType.SBP:
        if (!dto.sbp) throw new BadRequestException('SBP details required');
        command.sbp = { ...dto.sbp };
        break;
      case EnumBankDetailsType.PAYMENT_DETAILS:
        if (!dto.payment)
          throw new BadRequestException('Payment details required');
        command.payment = { ...dto.payment };
        break;
      default:
        throw new BadRequestException(`Unknown type: ${dto.type}`);
    }
    return command;
  }

  public static toFindAllCommand(queryDto: FindAllBankDetailsQueryDto): IFindAllBankDetailsCommand {
    return {
      page: queryDto.page,
      limit: queryDto.limit,
      beneficiaryId: queryDto.beneficiaryId,
      type: queryDto.type
    }
  }

  public static toFindMyCommand(userId: string): IFindMyBankDetailsCommand {
    return {
      userId: userId,
    }
  }

  public static toUpdateCommand(userId: string, bankDetailsId: string, dto: UpdateBankDetailsDto): IUpdateBankDetailsCommand {
    return {
      userId: userId,
      bankDetailsId: bankDetailsId,
      isDefault: dto.isDefault,
    }
  }

  public static toFindByIdCommand(userId: string, bankDetailsId: string): IFindBankDetailsByIdCommand {
    return {
      bankDetailsId: bankDetailsId,
      userId: userId
    }
  }

  public static toDeleteCommand(userId: string, bankDetailsId: string): IDeleteBankDetailsCommand {
    return {
      bankDetailsId: bankDetailsId,
      userId: userId,
    };
  }

  public static toResponse(entity: BankDetailsEntity): BankDetailsResponseDto {
    const details = entity.details.getValue();
    let detailsDto:
      | CardDetailsResponseDto
      | SbpDetailsResponseDto
      | PaymentDetailsResponseDto;


    switch (entity.type) {
      case EnumBankDetailsType.CARD:
        const card = details as CardDetails;
        detailsDto = {
          cardId: card.cardId,
          maskedPan: card.maskedPan,
          expiryMonth: card.expiryMonth,
          expiryYear: card.expiryYear,
          cardHolder: card.cardHolder,
        };
        break;
      case EnumBankDetailsType.SBP:
        const sbp = details as SbpDetails;
        detailsDto = {
          maskedPhone: sbp.maskedPhone,
          bankId: sbp.bankId,
        };
        break;
      case EnumBankDetailsType.PAYMENT_DETAILS:
        const payment = details as PaymentDetails;
        detailsDto = {
          maskedAccount: payment.maskedAccount,
          bankName: payment.bankName,
          bik: payment.bik,
        };
        break;
      default:
        throw new Error(`Unsupported type: ${entity.type}`);
    }


    return {
      id: entity.id,
      beneficiaryId: entity.beneficiaryId,
      type: entity.type,
      details: detailsDto,
      isDefault: entity.isDefault,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
