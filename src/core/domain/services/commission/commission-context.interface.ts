export interface CommissionContext {
  entityType: 'CONTRACT' | 'WITHDRAWAL' | 'DEPOSIT';
  amount: number;
  isSubscription?: boolean | null;
}
