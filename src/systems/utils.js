export const periodToNumber = (period) => {
  const [amount, unit] = period.split(' ');

  if (unit === 'ans' || unit === 'an') return Number(amount);
  if (unit === 'mois') return Number(amount) / 12;
  return 0;
};

export const numberToPeriod = (number) => {
  if (number < 1) return `${Math.round(number * 12)} mois`;
  if (number < 2) return '1 an';
  return `${Math.round(number)} ans`;
};
