export class UserAlreadyExistsException extends Error {
  constructor(
    public readonly email?: string,
    public readonly username?: string,
  ) {
    const field = email ? `email ${email}` : `username ${username}`;
    super(`User with ${field} already exists`);
  }
}
