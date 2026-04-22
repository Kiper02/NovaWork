import {
  WebSocketGateway,
} from '@nestjs/websockets';
import { BaseWebSocketGateway } from './base.gateway';

@WebSocketGateway({ namespace: 'notification' })
export class NotificationGateway extends BaseWebSocketGateway {
}
