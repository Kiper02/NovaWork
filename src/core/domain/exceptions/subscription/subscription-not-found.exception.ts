export class SubscriptionNotFoundException extends Error {
  constructor() {
    super(`Subscription not found`);
  }
}
