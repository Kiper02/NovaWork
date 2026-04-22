export class ChatBlockedException extends Error {
  constructor() {
    super(`Chat is blocked`);
  }
}
