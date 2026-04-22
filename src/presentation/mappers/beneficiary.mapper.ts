import { CreateBeneficiaryDto } from '../dto/beneficiary/create-beneficiary.dto';
import { ICreateBeneficiaryCommand } from '../../core/use-cases/payment/beneficiary/create/create-beneficiary.command';
import { BeneficiaryDocumentDto } from '../dto/beneficiary/beneficiary-document.dto';
import { BeneficiaryAddressDto } from '../dto/beneficiary/beneficiary-address.dto';
import {
  BeneficiaryDocument,
  EnumBeneficiaryDocumentType,
} from '../../core/domain/value-objects/beneficiary/beneficiary-document.type';
import {
  BeneficiaryAddress,
  EnumBeneficiaryAddressType,
} from '../../core/domain/value-objects/beneficiary/beneficiary-address.type';
import { BadRequestException } from '@nestjs/common';
import {
  BeneficiaryDetailsValueObject
} from '../../core/domain/value-objects/beneficiary/beneficiary-details.value-object';
import { UpdateBeneficiaryDto } from '../dto/beneficiary/update-beneficiary.dto';
import { IUpdateBeneficiaryCommand } from '../../core/use-cases/payment/beneficiary/update/update-beneficiary.command';
import {
  BeneficiaryEntity,
} from '../../core/domain/entities/finance/beneficiary.entity';
import { FindAllBeneficiaryQueryDto } from '../dto/beneficiary/find-all-beneficiary-query.dto';
import {
  IFindAllBeneficiaryCommand
} from '../../core/use-cases/payment/beneficiary/find-all/find-all-beneficiary.command';
import { BeneficiaryResponseDto } from '../dto/beneficiary/beneficiary-response.dto';
import { BeneficiaryDetailsDto } from '../dto/beneficiary/beneficiary-details.dto';
import {
  IFindBeneficiaryByUserIdCommand
} from '../../core/use-cases/payment/beneficiary/find-by-user-id/find-beneficiary-by-user-id.command';
import { IRemoveBeneficiaryCommand } from '../../core/use-cases/payment/beneficiary/remove/remove-beneficiary.command';

export class BeneficiaryMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateBeneficiaryDto,
  ): ICreateBeneficiaryCommand {
    const documents = dto.details.documents.map(
      this.toBeneficiaryDocumentCommand,
    );

    const addresses = dto.details.addresses.map(
      this.toBeneficiaryAddressCommand,
    );

    const details = new BeneficiaryDetailsValueObject(
      dto.details.firstName,
      dto.details.lastName,
      dto.details.isSelfEmployed,
      dto.details.birthDate,
      dto.details.birthPlace,
      dto.details.citizenship,
      dto.details.phoneNumber,
      dto.details.email,
      documents,
      addresses,
      dto.details.inn,
      dto.details.snils,
      dto.details.middleName,
    );
    return {
      userId,
      type: dto.type,
      details,
    };
  }

  public static toUpdateCommand(beneficiaryId: string, userId: string, dto: UpdateBeneficiaryDto): IUpdateBeneficiaryCommand {
    let documents: BeneficiaryDocument[] | undefined = undefined;
    let addresses: BeneficiaryAddress[] | undefined = undefined;
    let details: Partial<BeneficiaryDetailsValueObject> | undefined = undefined;

    if (dto.details && dto.details.documents) {
      documents = dto.details.documents.map(this.toBeneficiaryDocumentCommand);
    }

    if (dto.details && dto.details.addresses) {
      addresses = dto.details.addresses.map(this.toBeneficiaryAddressCommand);
    }

    if (dto.details) {
      details = {
        firstName: dto.details.firstName,
        lastName: dto.details.lastName,
        isSelfEmployed: dto.details.isSelfEmployed,
        birthDate: dto.details.birthDate,
        birthPlace: dto.details.birthPlace,
        citizenship: dto.details.citizenship,
        phoneNumber: dto.details.phoneNumber,
        email: dto.details.email,
        documents: documents,
        addresses: addresses,
        inn: dto.details.inn,
        snils: dto.details.snils,
        middleName: dto.details.middleName,
      }
    }

    return {
      beneficiaryId: beneficiaryId,
      userId: userId,
      type: dto.type,
      details: details
    }
  }

  public static toFindByUserIdCommand(userId: string): IFindBeneficiaryByUserIdCommand {
    return {
      userId: userId
    }
  }

  public static toRemoveCommand(beneficiaryId: string, userId: string): IRemoveBeneficiaryCommand {
    return {
      beneficiaryId: beneficiaryId,
      userId: userId
    }
  }

  public static toFindAllCommand(queryDto: FindAllBeneficiaryQueryDto): IFindAllBeneficiaryCommand {
    return {
      accountId: queryDto.accountId,
      type: queryDto.type,
      createdAtStart: queryDto.createdAtStart,
      createdAtEnd: queryDto.createdAtEnd,
      page: queryDto.page,
      limit: queryDto.limit,
    }
  }

  public static toResponse(entity: BeneficiaryEntity): BeneficiaryResponseDto {
    return {
      id: entity.id,
      accountId: entity.accountId,
      type: entity.type,
      externalId: entity.externalId,
      details: BeneficiaryMapper.toBeneficiaryDetails(entity.details),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }

  private static toBeneficiaryDetails(details: BeneficiaryDetailsValueObject): BeneficiaryDetailsDto {
    let documents: BeneficiaryDocumentDto[] = [];
    let addresses: BeneficiaryAddressDto[] = [];

    if (details.documents) {
      documents = details.documents.map(
        BeneficiaryMapper.toBeneficiaryDocumentCommand,
      );
    }

    if (details.addresses) {
      addresses = details.addresses.map(
        this.toBeneficiaryAddressCommand,
      );
    }


    return {
      firstName: details.firstName,
      middleName: details.middleName,
      lastName: details.lastName,
      isSelfEmployed: details.isSelfEmployed,
      birthDate: details.birthDate,
      birthPlace: details.birthPlace,
      citizenship: details.citizenship,
      phoneNumber: details.phoneNumber,
      email: details.email,
      documents: documents,
      addresses: addresses,
      inn: details.inn,
      snils: details.snils
    }
  }
  private static toBeneficiaryDocumentCommand(
    dto: BeneficiaryDocumentDto,
  ): BeneficiaryDocument {
    switch (dto.type) {
      case EnumBeneficiaryDocumentType.PASSPORT:
        if (!dto.serial || !dto.number || !dto.date || !dto.division) {
          throw new BadRequestException(
            'Missing required fields for PASSPORT: serial, number, date, division',
          );
        }
        return {
          type: EnumBeneficiaryDocumentType.PASSPORT,
          serial: dto.serial,
          number: dto.number,
          date: dto.date,
          organization: dto.organization ?? '',
          division: dto.division,
        };

      case EnumBeneficiaryDocumentType.FOREIGN_PASSPORT:
        if (!dto.number || !dto.date || !dto.organization) {
          throw new BadRequestException(
            'Missing required fields for FOREIGN_PASSPORT: number, date, organization',
          );
        }
        return {
          type: EnumBeneficiaryDocumentType.FOREIGN_PASSPORT,
          number: dto.number,
          date: dto.date,
          organization: dto.organization,
        };

      case EnumBeneficiaryDocumentType.CONTRACT_GPD:
        if (!dto.number || !dto.date || !dto.expireDate) {
          throw new BadRequestException(
            'Missing required fields for CONTRACT_GPD: number, date, expireDate',
          );
        }
        return {
          type: EnumBeneficiaryDocumentType.CONTRACT_GPD,
          number: dto.number,
          date: dto.date,
          expireDate: dto.expireDate,
        };
      default:
        throw new BadRequestException(`Unknown document type: ${dto.type}`);
    }
  }

  private static toBeneficiaryAddressCommand(
    dto: BeneficiaryAddressDto,
  ): BeneficiaryAddress {
    const validTypes = [
      'REGISTRATION_ADDRESS',
      'RESIDENCE_ADDRESS',
      'POSTAL_ADDRESS',
    ];
    if (!validTypes.includes(dto.type)) {
      throw new BadRequestException(`Invalid address type: ${dto.type}`);
    }
    return {
      type: dto.type as EnumBeneficiaryAddressType,
      address: dto.address,
    };
  }
}
