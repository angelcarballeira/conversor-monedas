export interface ExchangeRateResponse {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export interface CurrencyOption {
  code: string;
  label: string;
}