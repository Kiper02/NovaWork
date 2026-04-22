import {
  ICreatePayoutPortRequestType,
  IPayoutPortResultType,
} from './types/create-payout.type';
import { IPayoutStatusPortResultType } from './types/payout-status.dto';

export abstract class PayoutPort {
  /** Создать выплату бенефициару */
  abstract createPayout(data: ICreatePayoutPortRequestType): Promise<IPayoutPortResultType>;

  /** Получить статус выплаты по внешнему ID */
  abstract getPayoutStatus(payoutId: string): Promise<IPayoutStatusPortResultType>;
}
