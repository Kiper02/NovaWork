export class BidNotFoundException extends Error {
  constructor() {
    super(`Bid not found`);
  }
}
