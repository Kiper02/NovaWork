import { CommissionRuleEntity } from '../../entities/finance/commission-rule.entity';
import { CommissionContext } from './commission-context.interface';

export class CommissionCalculatorService {
  public calculate(
    context: CommissionContext,
    rules: CommissionRuleEntity[],
  ): number {
    const applicableRules = rules.filter(
      (rule) =>
        rule.entityType === context.entityType &&
        rule.isActive &&
        this.isDateValid(rule.validFrom, rule.validTo),
    );

    const matchedRules = applicableRules.filter((rule) => {
      return !(rule.isSubscription !== null &&
        rule.isSubscription !== context.isSubscription);

    });
    matchedRules.sort((a, b) => b.priority - a.priority);

    const rule = matchedRules[0];
    if (!rule) return 0;

    if (rule.minAmount !== null && context.amount < rule.minAmount) return 0;
    if (rule.maxAmount !== null && context.amount > rule.maxAmount) return 0;

    let fee = 0;
    if (rule.calculationType === 'PERCENT') {
      fee = (context.amount * rule.value) / 100;
    } else if (rule.calculationType === 'FIXED') {
      fee = rule.value;
    }

    return Math.round(fee * 100) / 100;
  }

  private isDateValid(validFrom: Date, validTo: Date | null): boolean {
    const now = new Date();
    if (now < validFrom) return false;
    return !(validTo && now > validTo);

  }
}
