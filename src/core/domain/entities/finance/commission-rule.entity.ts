export class CommissionRuleEntity {
  public constructor(
    public readonly id: string,
    public readonly name: string, // Название, например, "Контракт: Стандарт"
    public readonly entityType: EnumEntityType, // К чему применить
    public readonly calculationType: EnumCalculationType, // Как считать: процент или фикс
    public readonly value: number, // Значение комиссии (10 или 100)
    public readonly minAmount: number | null, // Мин. сумма для применения правила
    public readonly maxAmount: number | null, // Макс. сумма для применения правила
    public readonly isSubscription: boolean | null, // Для какого тарифа (NULL - для всех)
    public readonly categoryId: string | null, // Для какой категории услуг (NULL - для всех)
    public readonly isActive: boolean, // Активно ли правило сейчас
    public readonly priority: number, // Приоритет: чем выше, тем важнее
    public readonly validFrom: Date, // С какого числа правило действует
    public readonly validTo: Date | null, // По какое число (NULL - бессрочно)
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

export enum EnumCalculationType {
  PERCENT = 'PERCENT',
  FIXED = 'FIXED'
}

export enum EnumEntityType {
  CONTRACT = 'CONTRACT',
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT'
}