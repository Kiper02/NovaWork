export class InvitationAmbiguousException extends Error {
  constructor() {
    super(`An ambiguous invitation`);
  }
}
