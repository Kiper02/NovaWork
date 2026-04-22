import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { SocketStateService } from './socket-state.service';

@Global()
@Module({
  providers: [RedisService, SocketStateService],
  exports: [RedisService, SocketStateService],
})
export class RedisModule {}
