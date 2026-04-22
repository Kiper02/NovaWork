import { Injectable } from '@nestjs/common';
import { BidRepository } from '../../../domain/repositories/project/bid.repository';
import { IUpdateBidCommand } from './update-bid.command';
import { BidNotFoundException } from '../../../domain/exceptions/bid/bid-not-found.exception';

@Injectable()
export class UpdateBidUseCase {
  public constructor(
    private readonly bidRepository: BidRepository
  ) {
  }

  public async execute(command: IUpdateBidCommand) {
    const existingBid = await this.bidRepository.findById(command.bidId);
    if(!existingBid) {
      throw new BidNotFoundException();
    }

    return this.bidRepository.update(command.bidId, command);
  }
}