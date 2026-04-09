export class ProfileNotFoundException extends Error {
  constructor() {
    super(`Profile not found`);
  }
}
