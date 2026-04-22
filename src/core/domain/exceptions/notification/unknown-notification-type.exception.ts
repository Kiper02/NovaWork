export class UnknownNotificationTypeException extends Error {
  constructor() {
    super(`Unknown notification type`);
  }
}
