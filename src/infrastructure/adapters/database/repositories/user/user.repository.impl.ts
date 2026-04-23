import { UserRepository } from '../../../../../core/domain/repositories/user/user.repository';
import { UserEntity } from '../../../../../core/domain/entities/user/user.entity';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { UserMapper } from '../../mappers/user/user.mapper';
import { Injectable } from '@nestjs/common';

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

  public async findByIds(userIds: string[]): Promise<UserEntity[]> {
    const records = await this.prismaService.user.findMany({
      where: {
        id: {
          in: userIds
        }
      }
    })

    return records.map(record => UserMapper.toEntity(record));
  }
}