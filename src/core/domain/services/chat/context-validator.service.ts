import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../repositories/project/workspace.repository';
import { ContractRepository } from '../../repositories/project/contract.repository';
import { BidRepository } from '../../repositories/project/bid.repository';
import { EnumChatContext } from '../../entities/chat/chat.entity';
import { ContextNotFoundException } from '../../exceptions/chat/context-not-found.exception';

@Injectable()
export class ContextValidatorService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly contractRepository: ContractRepository,
    private readonly bidRepository: BidRepository,
  ) {}

  async validateContext(
    context: EnumChatContext,
    contextId: string,
  ): Promise<void> {
    let exists = false;
    switch (context) {
      case EnumChatContext.WORKSPACE:
        const workspace = await this.workspaceRepository.findById(contextId);
        exists = !!workspace;
        break;
      case EnumChatContext.CONTRACT:
        const contract = await this.contractRepository.findById(contextId);
        exists = !!contract;
        break;
      case EnumChatContext.BID:
        const bid = await this.bidRepository.findById(contextId);
        exists = !!bid;
        break;
      default:
        throw new ContextNotFoundException();
    }
    if (!exists) throw new ContextNotFoundException();
  }
}
