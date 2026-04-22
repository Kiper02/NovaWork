export class PlatformSettingsNotFoundException extends Error {
  constructor() {
    super(`Platform settings not found`);
  }
}
