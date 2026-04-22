export interface IAddCardPortResult {
  requestId: string;
  addCardUrl: string; // URL виджета для привязки карты
  status: 'PENDING' | 'READY' | 'FAILED';
}
