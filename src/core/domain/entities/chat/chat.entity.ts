import { ChatBlock } from '../../value-objects/chat/chat-block.value-object';
import { ChatMemberEntity } from './chat-member.entity';
import {v4 as uuid} from 'uuid';

export class ChatEntity {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly type: EnumChatType,
    public members: ChatMemberEntity[],
    public readonly createdAt: Date,
    public updatedAt: Date,
    public block: ChatBlock | null,
    public readonly context: EnumChatContext | null,
    public readonly contextId: string | null,
  ) {}

  public addMember(userId: string) {
    if (this.members.some((m) => m.userId === userId)) return;
    this.members.push(
      new ChatMemberEntity(uuid(), this.id, userId, new Date(), new Date()),
    );
    this.updatedAt = new Date();
  }

  public removeMember(userId: string) {
    this.members = this.members.filter((m) => m.userId !== userId);
    this.updatedAt = new Date();
  }

  public blockMember(
    blockedByUserId: string,
    reason: string,
    expiresAt?: Date,
  ): void {
    if (this.block && this.block.isActive()) {
      throw new Error('Chat is already blocked');
    }
    this.block = new ChatBlock(new Date(), blockedByUserId, reason, expiresAt);
    this.updatedAt = new Date();
  }

  public unblock(): void {
    if (!this.block) {
      throw new Error('Chat is not blocked');
    }
    this.block = null;
    this.updatedAt = new Date();
  }

  public isBlocked(): boolean {
    return this.block !== null && this.block.isActive();
  }

  public getMembers(): readonly ChatMemberEntity[] {
    return this.members;
  }
}

export enum EnumChatContext {
  CONTRACT = "CONTRACT",
  BID = "BID",
  WORKSPACE = "WORKSPACE"
}

export enum EnumChatType {
  DIRECT = "DIRECT",
  GROUP = "GROUP"
}
