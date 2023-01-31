export function currencyFormat(value: number): string {
  return "$" + value.toFixed(2);
}
