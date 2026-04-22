export class UpdateServiceException extends Error {
  constructor() {
    super(`Couldn't update service`);
  }
}
