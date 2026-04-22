export class ProfileUpdateForbiddenException extends Error {
  public constructor() {
    super("You don't have access to update this profile.");
  }
}