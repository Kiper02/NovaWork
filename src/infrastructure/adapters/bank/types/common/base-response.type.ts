/**
 * Базовый ответ API Т-Банка (общий для T-API и эквайринга)
 */
export interface IBaseBankResponse {
  ErrorCode: string;
  Success: boolean;
  Message?: string;
  Details?: string;
  TerminalKey?: string;
}
