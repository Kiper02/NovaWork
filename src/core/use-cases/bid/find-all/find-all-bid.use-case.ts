import { Injectable } from '@nestjs/common';
import { BidRepository } from '../../../domain/repositories/project/bid.repository';
import { IFindAllBidCommand } from './find-all-bid.command';
import { BidFiltersValueObject } from '../../../domain/value-objects/bid/bid-filters.value.object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindAllBidUseCase {
  public constructor(
    private readonly bidRepository: BidRepository
  ) {
  }

  public async execute(command: IFindAllBidCommand) {
    const params = new BidFiltersValueObject(
      command.userId,
      command.taskId,
      command.amountStart,
      command.amountEnd,
      command.createdAtStart,
      command.createdAtEnd,
    )

    const pagination = new PaginationParamsValueObject(command.page, command.limit)

    return this.bidRepository.findAll(params, pagination)
  }
}