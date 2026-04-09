import { PrismaService } from '../orm/prisma-recource/prisma.service';
import { GlobalRoleRepository } from '../../../core/domain/repositories/global-role.repository';
import { GlobalRoleEntity } from '../../../core/domain/entities/global-role.entity';
import { GlobalRoleMapper } from '../mappers/global-role.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalRoleRepositoryImpl implements GlobalRoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findUserRoles(userId: string): Promise<GlobalRoleEntity[]> {
    const userRoles = await this.prismaService.userGlobalRole.findMany({
      where: { userId: userId },
      include: {
        role: true,
      },
    });

    return userRoles.map((ur) => GlobalRoleMapper.toEntity(ur.role));
  }
}
