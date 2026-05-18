export class TaskViewNotFoundException extends Error {
  constructor() {
    super(`Task view not found`);
  }
}
