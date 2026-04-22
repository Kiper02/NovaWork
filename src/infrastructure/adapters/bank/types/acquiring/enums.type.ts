export enum EnumPayType {
  O = 'O', // одностадийная оплата
  T = 'T', // двухстадийная оплата
}

export enum EnumLanguageInitPayment {
  ru = 'ru',
  en = 'en',
}

export enum EnumFFDVersion {
  one = '1_2',
  two = '1.05',
}

export enum EnumTaxation {
  osn = 'osn', // общая
  usn_income = 'usn_income', // УСН доходы
  usn_income_outcome = 'usn_income_outcome', // УСН доходы минус расходы
  esn = 'esn', // ЕСХН
  patent = 'patent', // патент
}

export enum EnumAgentSign {
  bank_paying_agent = 'bank_paying_agent',
  bank_paying_subagent = 'bank_paying_subagent',
  paying_agent = 'paying_agent',
  paying_subagent = 'paying_subagent',
  attorney = 'attorney',
  commission_agent = 'commission_agent',
  another = 'another',
}

export enum EnumTax {
  none = 'none',
  vat0 = 'vat0',
  vat5 = 'vat5',
  vat7 = 'vat7',
  vat10 = 'vat10',
  vat20 = 'vat20',
  vat22 = 'vat22',
  vat105 = 'vat105',
  vat107 = 'vat107',
  vat110 = 'vat110',
  vat120 = 'vat120',
  vat122 = 'vat122',
}

export enum EnumPaymentMethod {
  full_prepayment = 'full_prepayment',
  prepayment = 'prepayment',
  advance = 'advance',
  full_payment = 'full_payment',
  partial_payment = 'partial_payment',
  credit = 'credit',
  credit_payment = 'credit_payment',
}

export enum EnumPaymentObject {
  commodity = 'commodity',
  excise = 'excise',
  job = 'job',
  service = 'service',
  gambling_bet = 'gambling_bet',
  gambling_prize = 'gambling_prize',
  lottery = 'lottery',
  lottery_prize = 'lottery_prize',
  intellectual_activity = 'intellectual_activity',
  payment = 'payment',
  agent_commission = 'agent_commission',
  contribution = 'contribution',
  property_rights = 'property_rights',
  unrealization = 'unrealization',
  tax_reduction = 'tax_reduction',
  trade_fee = 'trade_fee',
  resort_tax = 'resort_tax',
  pledge = 'pledge',
  income_decrease = 'income_decrease',
  ie_pension_insurance_without_payments = 'ie_pension_insurance_without_payments',
  ie_pension_insurance_with_payments = 'ie_pension_insurance_with_payments',
  ie_medical_insurance_without_payments = 'ie_medical_insurance_without_payments',
  ie_medical_insurance_with_payments = 'ie_medical_insurance_with_payments',
  social_insurance = 'social_insurance',
  casino_chips = 'casino_chips',
  agent_payment = 'agent_payment',
  excisable_goods_without_marking_code = 'excisable_goods_without_marking_code',
  excisable_goods_with_marking_code = 'excisable_goods_with_marking_code',
  goods_without_marking_code = 'goods_without_marking_code',
  goods_with_marking_code = 'goods_with_marking_code',
  another = 'another',
}

export enum EnumMarkCodeType {
  UNKNOWN = 'UNKNOWN',
  EAN8 = 'EAN8',
  EAN13 = 'EAN13',
  ITF14 = 'ITF14',
  GS10 = 'GS10',
  GS1M = 'GS1M',
  SHORT = 'SHORT',
  FUR = 'FUR',
  EGAIS20 = 'EGAIS20',
  EGAIS30 = 'EGAIS30',
  RAWCODE = 'RAWCODE',
}
