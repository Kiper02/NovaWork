import { PlatformSettingsEntity } from '../../entities/shared/platform-settings.entity';

export abstract class PlatformSettingsRepository {
  public abstract get(): Promise<PlatformSettingsEntity | null>;
  public abstract save(settings: PlatformSettingsEntity): Promise<PlatformSettingsEntity>;
}