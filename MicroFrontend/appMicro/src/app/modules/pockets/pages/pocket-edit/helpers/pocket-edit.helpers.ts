export function calculateInstallmentsPocket(
  goal: number,
  quota: number,
  amountSaved: number
): number {
  return Math.ceil((goal - amountSaved) / quota);
}
