import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { ChatEntity, EnumChatContext } from '../../entities/chat/chat.entity';
import { ChatFiltersValueObject } from '../../value-objects/chat/chat-filters.value.object';

export abstract class ChatRepository {
  public abstract save(entity: ChatEntity): Promise<ChatEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<ChatEntity, 'id' | 'createdAt'>>,
  ): Promise<ChatEntity>;
  public abstract findAll(
    params: ChatFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ChatEntity>>;
  public abstract findById(id: string): Promise<ChatEntity | null>;
  public abstract findByContextAndContextId(
    contextId: string,
    context: EnumChatContext,
  ): Promise<ChatEntity | null>;
}
