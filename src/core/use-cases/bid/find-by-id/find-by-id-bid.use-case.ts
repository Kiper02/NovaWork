import { Injectable } from '@nestjs/common';
import { BidRepository } from '../../../domain/repositories/project/bid.repository';
import { IFindByIdBidCommand } from './find-by-id-bid.command';
import { BidNotFoundException } from '../../../domain/exceptions/bid/bid-not-found.exception';

@Injectable()
export class FindByIdBidUseCase {
  public constructor(
    private readonly bidRepository: BidRepository
  ) {
  }

  public async execute(command: IFindByIdBidCommand) {
    const bid = await this.bidRepository.findById(command.bidId);

    if(!bid) {
      throw new BidNotFoundException()
    }

    return bid;
  }
}