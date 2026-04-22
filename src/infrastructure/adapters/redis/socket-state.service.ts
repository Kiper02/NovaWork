import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class SocketStateService {
  private readonly SOCKET_PREFIX = 'socket:';
  private readonly USER_PREFIX = 'user:sockets:';

  public constructor(private readonly redisService: RedisService) {}

  public async addSocket(socketId: string, userId: string): Promise<void> {
    await this.redisService.set(`${this.SOCKET_PREFIX}${socketId}`, userId);
    await this.redisService.sadd(`${this.USER_PREFIX}${userId}`, socketId);
  }

  public async removeSocket(socketId: string): Promise<void> {
    const userId = await this.redisService.get(`${this.SOCKET_PREFIX}${socketId}`);
    if (userId) {
      await this.redisService.del(`${this.SOCKET_PREFIX}${socketId}`);
      await this.redisService.srem(`${this.USER_PREFIX}${userId}`, socketId);
    }
  }

  public async getUserSockets(userId: string): Promise<string[]> {
    return this.redisService.smembers(`${this.USER_PREFIX}${userId}`);
  }

  public async isUserOnline(userId: string): Promise<boolean> {
    const count = await this.redisService.scard(`${this.USER_PREFIX}${userId}`);
    return count > 0;
  }

  public async getUserIdBySocket(socketId: string): Promise<string | null> {
    return this.redisService.get(`${this.SOCKET_PREFIX}${socketId}`);
  }
}
