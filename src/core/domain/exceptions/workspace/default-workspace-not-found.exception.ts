export class DefaultWorkspaceNotFoundException extends Error {
  constructor() {
    super(`Default workspace not found`);
  }
}
