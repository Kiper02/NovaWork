import { CreateBidDto } from '../dto/bid/create-bid.dto';
import { ICreateBidCommand } from '../../core/use-cases/bid/create/create-bid.command';
import { FindAllBidQueryDto } from '../dto/bid/find-all-bid-query.dto';
import { IFindAllBidCommand } from '../../core/use-cases/bid/find-all/find-all-bid.command';
import { IFindByIdBidCommand } from '../../core/use-cases/bid/find-by-id/find-by-id-bid.command';
import { BidEntity } from '../../core/domain/entities/project/bid.entity';
import { BidResponseDto } from '../dto/bid/bid-response.dto';
import { IUpdateBidCommand } from '../../core/use-cases/bid/update/update-bid.command';
import { UpdateBidDto } from '../dto/bid/update-bid.dto';

export class BidMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateBidDto,
  ): ICreateBidCommand {
    return {
      coverLetter: dto.coverLetter,
      amount: dto.amount,
      userId: userId,
      taskId: dto.taskId
    };
  }

  public static toUpdateCommand(
    id: string,
    userId: string,
    dto: UpdateBidDto,
  ): IUpdateBidCommand {
    return {
      bidId: id,
      amount: dto.amount,
      coverLetter: dto.coverLetter,
      userId: userId,
    };
  }

  public static toFindAllCommand(
    dto: FindAllBidQueryDto,
  ): IFindAllBidCommand {
    return {
      userId: dto.userId,
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      taskId: dto.taskId,
      amountStart: dto.amountStart,
      amountEnd: dto.amountEnd,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindMyCommand(
    userId: string,
    dto: FindAllBidQueryDto,
  ): IFindAllBidCommand {
    return {
      userId: userId,
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      taskId: dto.taskId,
      amountStart: dto.amountStart,
      amountEnd: dto.amountEnd,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindByIdCommand(
    userId: string,
    bidId: string,
  ): IFindByIdBidCommand {
    return {
      userId: userId,
      bidId: bidId,
    };
  }

  public static toResponse(entity: BidEntity): BidResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      coverLetter: entity.coverLetter,
      amount: entity.amount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
