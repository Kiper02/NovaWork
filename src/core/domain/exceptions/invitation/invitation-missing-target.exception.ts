export class InvitationMissingTargetException extends Error {
  constructor() {
    super(`The target object is missing in the invitation`);
  }
}
