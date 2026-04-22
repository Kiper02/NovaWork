/**
 * Утилита для преобразования форматов дат
 */
export class DateFormatter {
  /**
   * Преобразует дату из формата YYYY-MM-DD в формат ДД.ММ.ГГГГ
   * @param date - дата в формате YYYY-MM-DD
   * @returns дата в формате ДД.ММ.ГГГГ
   * @throws {Error} если формат даты не соответствует ожидаемому
   */
  public static toDdMmYyyy(date: string): string {
    if (!date) return date;

    const parts = date.split('-');
    if (parts.length !== 3) {
      throw new Error(`Invalid date format. Expected YYYY-MM-DD, got: ${date}`);
    }

    const [year, month, day] = parts;
    return `${day}.${month}.${year}`;
  }

  /**
   * Преобразует дату из формата ДД.ММ.ГГГГ в формат YYYY-MM-DD
   * @param date - дата в формате ДД.ММ.ГГГГ
   * @returns дата в формате YYYY-MM-DD
   * @throws {Error} если формат даты не соответствует ожидаемому
   */
  public static toYyyyMmDd(date: string): string {
    if (!date) return date;

    const parts = date.split('.');
    if (parts.length !== 3) {
      throw new Error(`Invalid date format. Expected DD.MM.YYYY, got: ${date}`);
    }

    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }

  /**
   * Проверяет, соответствует ли строка формату YYYY-MM-DD
   */
  public static isValidYyyyMmDd(date: string): boolean {
    if (!date) return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;
    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  }

  /**
   * Проверяет, соответствует ли строка формату ДД.ММ.ГГГГ
   */
  public static isValidDdMmYyyy(date: string): boolean {
    if (!date) return false;
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regex.test(date)) return false;
    const [day, month, year] = date.split('.').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  }
}
