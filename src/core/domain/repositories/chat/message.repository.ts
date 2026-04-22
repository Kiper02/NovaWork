import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { MessageEntity } from '../../entities/chat/message.entity';
import { MessageFiltersValueObject } from '../../value-objects/message/message-filters.value.object';

export abstract class MessageRepository {
  public abstract save(entity: MessageEntity): Promise<MessageEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<MessageEntity, 'id' | 'createdAt'>>,
  ): Promise<MessageEntity>;
  public abstract findAll(
    params: MessageFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<MessageEntity>>;
  public abstract findById(id: string): Promise<MessageEntity | null>;
}
