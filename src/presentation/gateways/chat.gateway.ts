import {
  WebSocketGateway
} from '@nestjs/websockets';
import { BaseWebSocketGateway } from './base.gateway';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway extends BaseWebSocketGateway {

}