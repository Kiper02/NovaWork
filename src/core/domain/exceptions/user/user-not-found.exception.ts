export class UserNotFoundException extends Error {
  constructor(
    public readonly type: "email" | "username"|  "userId",
    public readonly value: string,
  ) {
    super(`User with ${type} = ${value} not found`);
  }
}
