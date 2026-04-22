import { Injectable } from '@nestjs/common';
import { UserAggregate } from '../../../domain/aggregates/user.aggregate';
import { IFindMeCommand } from './find-me.command';
import { UserNotFoundException } from '../../../domain/exceptions/user/user-not-found.exception';
import { UserQueryRepository } from '../../../domain/repositories/user/user-query.repository';

@Injectable()
export class FindMeUseCase {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async execute(command: IFindMeCommand): Promise<UserAggregate> {
    const user = await this.userQueryRepository.findMe(command.userId);
    if (!user) {
      throw new UserNotFoundException('userId', command.userId);
    }

    return user;
  }
}
