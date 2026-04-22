export class ContextNotFoundException extends Error {
  constructor() {
    super(`Context not found`);
  }
}
