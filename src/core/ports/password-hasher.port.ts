export abstract class PasswordHasherPort {
  abstract verify(hash: string, plain: string): Promise<boolean>;
  abstract hash(plain: string): Promise<string>;
}
