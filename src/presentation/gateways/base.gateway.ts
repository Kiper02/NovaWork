import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import cookie from 'cookie';
import { RedisService } from '../../infrastructure/adapters/redis/redis.service';

@WebSocketGateway()
export abstract class BaseWebSocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  public constructor(
    protected readonly configService: ConfigService,
    protected readonly redisService: RedisService,
  ) {}

  public async handleConnection(client: Socket): Promise<void> {
    const userId = await this.authenticate(client);
    if (!userId) {
      client.disconnect();
      return;
    }
    client.data.userId = userId;
    client.join(`user:${userId}`);
  }

  protected async authenticate(client: Socket): Promise<string | null> {
    const cookieHeader = client.handshake.headers.cookie;
    if (!cookieHeader) return null;

    const cookies = cookie.parse(cookieHeader);
    const sessionId = cookies[this.configService.getOrThrow('SESSION_NAME')];
    const sessionPrefix =
      this.configService.getOrThrow<string>('SESSION_FOLDER');
    if (!sessionId) return null;

    const sessionDataRaw = await this.redisService.get(
      `${sessionPrefix}${sessionId}`,
    );
    if (!sessionDataRaw) return null;

    const sessionData = JSON.parse(sessionDataRaw);
    return sessionData.userId ?? sessionData.passport?.user ?? null;
  }
}
