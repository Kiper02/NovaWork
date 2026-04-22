export class RecipientNotFoundException extends Error {
  constructor() {
    super(`Recipient not found`);
  }
}
