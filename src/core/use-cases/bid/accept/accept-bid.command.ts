import { UserEntity } from '../../../domain/entities/user/user.entity';

export interface IAcceptBidCommand {
  bidId: string;
  user: UserEntity
}