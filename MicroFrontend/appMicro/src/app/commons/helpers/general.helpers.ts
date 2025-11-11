export function getPercentage(
  value: number,
  total: number,
  decimals: number = 2
): string {
  return ((value * 100) / total).toFixed(decimals);
}

export function getDate() {
  const currentDate = new Date();
  const lastTransactionDate = this.facade?.lastTransactionDate$?.currentValue();
  const lasTransactionDateParts = lastTransactionDate
    ? lastTransactionDate.split(' - ')
    : [
        currentDate.toLocaleDateString(),
        'Hora: ' +
          currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
      ];
  return [
    `<span class="voucher-description-date">${lasTransactionDateParts[0]}</span>`,
    `<span class="voucher-description-time">${lasTransactionDateParts[1]}</spanclass>`
  ];
}
