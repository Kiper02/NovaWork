export class CreateServiceException extends Error {
  constructor() {
    super(`Couldn't create service`);
  }
}
