import { Module } from '@nestjs/common';
import { BidsController } from '../../presentation/controllers/bids.controller';
import { CreateBidUseCase } from '../../core/use-cases/bid/create/create-bid.use-case';
import { UpdateBidUseCase } from '../../core/use-cases/bid/update/update-bid.use-case';
import { FindAllBidUseCase } from '../../core/use-cases/bid/find-all/find-all-bid.use-case';
import { FindByIdBidUseCase } from '../../core/use-cases/bid/find-by-id/find-by-id-bid.use-case';


@Module({
  controllers: [BidsController],
  providers: [
    CreateBidUseCase,
    UpdateBidUseCase,
    FindAllBidUseCase,
    FindByIdBidUseCase,
  ],
})
export class BidModule {}
