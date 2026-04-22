export abstract class EmailStrategyPort {
  public abstract execute(to: string, context: Record<string, any>): Promise<void>;
}