import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserAggregate } from '../../../domain/aggregates/user.aggregate';
import { IFindMeCommand } from './find-me.command';
import { UserNotFoundException } from '../../../domain/exceptions/user/user-not-found.exception';

@Injectable()
export class FindMeUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: IFindMeCommand): Promise<UserAggregate> {
    const user = await this.userRepository.findMe(command.userId);
    if(!user) {
      throw new UserNotFoundException('userId', command.userId);
    }

    return user
  }
}
