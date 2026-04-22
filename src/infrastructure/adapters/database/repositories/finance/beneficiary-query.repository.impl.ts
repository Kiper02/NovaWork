import { Injectable } from '@nestjs/common';
import { BeneficiaryQueryRepository } from '../../../../../core/domain/repositories/finance/beneficiary-query.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { BeneficiaryAggregate } from 'src/core/domain/aggregates/beneficiary.aggregate';
import { AccountMapper } from '../../mappers/finance/account.mapper';
import { UserMapper } from '../../mappers/user/user.mapper';
import { BeneficiaryMapper } from '../../mappers/finance/beneficiary.mapper';

@Injectable()
export class BeneficiaryQueryRepositoryImpl implements BeneficiaryQueryRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdForDetails(
    beneficiaryId: string,
  ): Promise<BeneficiaryAggregate | null> {
    const record = await this.prismaService.beneficiary.findUnique({
      where: {
        id: beneficiaryId
      },
      include: {
        account: {
          include: {
            user: true
          }
        }
      }
    })
    if (!record) return null;

    const accountEntity = AccountMapper.toEntity(record.account);
    const userEntity = UserMapper.toEntity(record.account.user);
    const beneficiaryEntity = BeneficiaryMapper.toEntity(record);

    return new BeneficiaryAggregate(
      beneficiaryEntity,
      accountEntity,
      userEntity,
    );
  }
}