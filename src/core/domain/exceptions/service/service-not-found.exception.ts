export class ServiceNotFoundException extends Error {
  constructor() {
    super(`Service not found`);
  }
}
