import { IChatWithLastMessageDto } from './chat-read.types';
import { PaginationParamsValueObject } from '../../domain/value-objects/shared/pagination-params.value-object';
import { ChatFiltersValueObject } from '../../domain/value-objects/chat/chat-filters.value.object';
import { PaginatedResultValueObject } from '../../domain/value-objects/shared/paginated-result.value-object';


export abstract class ChatReadPort {
  abstract findChatsWithLastMessage(
    params: ChatFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<IChatWithLastMessageDto>>;
}