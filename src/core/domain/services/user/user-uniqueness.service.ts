import { UserRepository } from '../../repositories/user/user.repository';
import { UserAlreadyExistsException } from '../../exceptions/user/user-already-exists.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserUniquenessService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkUniqueness(email: string, username: string): Promise<void> {
    const existingEmail = await this.userRepository.findByEmail(email);
    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingEmail || existingUsername) {
      throw new UserAlreadyExistsException(email);
    }
  }
}
