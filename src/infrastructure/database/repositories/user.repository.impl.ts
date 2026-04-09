import { UserRepository } from '../../../core/domain/repositories/user.repository';
import { UserEntity } from '../../../core/domain/entities/user.entity';
import { PrismaService } from '../orm/prisma-recource/prisma.service';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import { UserAggregate } from '../../../core/domain/aggregates/user.aggregate';
import { AccountMapper } from '../mappers/account.mapper';
import { AccountRepository } from '../../../core/domain/repositories/account.repository';
import { ProfileMapper } from '../mappers/profile.mapper';
import { AccountEntity } from '../../../core/domain/entities/account.entity';
import { ProfileEntity } from '../../../core/domain/entities/profile.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  public async save(user: UserEntity): Promise<UserEntity> {
    const model = UserMapper.toModel(user);
    const result = await this.prismaService.user.create({
      data: model,
    });

    return UserMapper.toEntity(result);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const record = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!record) return null;
    return UserMapper.toEntity(record);
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const record = await this.prismaService.user.findUnique({ where: { id } });
    if (!record) return null;
    return UserMapper.toEntity(record);
  }

  public async findByUsername(username: string): Promise<UserEntity | null> {
    const record = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (!record) return null;
    return UserMapper.toEntity(record);
  }

  public async findMe(id: string): Promise<UserAggregate | null> {
    const record = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        profile: true,
        account: true,
      }
    });
    if(!record) return null;

    const { account, profile, ...rest } = record

    const user = UserMapper.toEntity(rest);
    let accountEntity: AccountEntity | null = null
    let profileEntity: ProfileEntity | null = null

    if(account) {
      accountEntity = AccountMapper.toEntity(account);
    }
    if(profile) {
      profileEntity = ProfileMapper.toEntity(profile);
    }

    return new UserAggregate(user, profileEntity, accountEntity);
  }
}