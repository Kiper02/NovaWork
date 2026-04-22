import { Injectable } from '@nestjs/common';
import { UserQueryRepository } from '../../../../../core/domain/repositories/user/user-query.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { UserAggregate } from 'src/core/domain/aggregates/user.aggregate';
import { UserMapper } from '../../mappers/user/user.mapper';
import { AccountEntity } from '../../../../../core/domain/entities/finance/account.entity';
import { ProfileEntity } from '../../../../../core/domain/entities/user/profile.entity';
import { WorkspaceEntity } from '../../../../../core/domain/entities/project/workspace.entity';
import { AccountMapper } from '../../mappers/finance/account.mapper';
import { ProfileMapper } from '../../mappers/user/profile.mapper';
import { WorkspaceMapper } from '../../mappers/project/workspace.mapper';

@Injectable()
export class UserQueryRepositoryImpl implements UserQueryRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findMe(id: string): Promise<UserAggregate | null> {
    const record = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        profile: true,
        account: true,
        workspaces: true,
      },
    });
    if (!record) return null;

    const { account, profile, workspaces, ...rest } = record;

    const user = UserMapper.toEntity(rest);
    let accountEntity: AccountEntity | null = null;
    let profileEntity: ProfileEntity | null = null;
    let workspacesEntity: WorkspaceEntity[] = [];

    if (account) {
      accountEntity = AccountMapper.toEntity(account);
    }
    if (profile) {
      profileEntity = ProfileMapper.toEntity(profile);
    }
    if (workspaces.length > 0) {
      workspacesEntity = workspaces.map(WorkspaceMapper.toEntity);
    }

    return new UserAggregate(
      user,
      profileEntity,
      accountEntity,
      workspacesEntity,
    );
  }
  public async findByIdWithProfile(id: string): Promise<UserAggregate | null> {
    const record = await this.prismaService.user.findUnique({
      where: {
        id: id
      },
      include: {
        profile: true
      }
    })

    if(!record) return null;

    const { profile, ...rest } = record;

    const user = UserMapper.toEntity(rest);

    let profileEntity: ProfileEntity | null = null;

    if (profile) {
      profileEntity = ProfileMapper.toEntity(profile);
    }

    return new UserAggregate(
      user,
      profileEntity,
      null,
      null
    )
  }
  public async findByIdWithAccount(id: string): Promise<UserAggregate | null> {
    const record = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        account: true,
      },
    });

    if (!record) return null;

    const { account, ...rest } = record;

    const user = UserMapper.toEntity(rest);

    let accountEntity: AccountEntity | null = null;

    if (account) {
      accountEntity = AccountMapper.toEntity(account);
    }

    return new UserAggregate(user, null, accountEntity, null);
  }
}