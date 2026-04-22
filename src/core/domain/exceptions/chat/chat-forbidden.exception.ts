export class ChatForbiddenException extends Error {
  public constructor() {
    super("You don't have access to this chat.");
  }
}