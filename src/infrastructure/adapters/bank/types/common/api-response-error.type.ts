/**
 * Структура ошибки, возвращаемая API Т-Банка при неудачном запросе
 */
export interface IApiResponseError {
  errorId: string;
  errorMessage: string;
  errorCode: string;
}
