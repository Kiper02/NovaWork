export interface IAddCard {
  benefeciaryId: string;
}

export interface IAddCardResponse {
  benefeciaryId: string;
  addCardRequestId: string;
  terminalKey: string;
  status: 'PENDING' | 'READY' | 'FAILED';
  addCardUrl: string;
}
