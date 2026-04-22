export class TaskInvalidPriceRangeException extends Error {
  constructor() {
    super('Minimum price cannot be greater than maximum price');
  }
}
