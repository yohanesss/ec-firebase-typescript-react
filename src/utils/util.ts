export const toLocalCurrency = (num: number) =>
  num.toLocaleString().replace(/,/g, ".");
