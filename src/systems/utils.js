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

export const getOppositeColor = (color) => {
  color = color.replace('#', '');

  const formatted =
    color.length === 3
      ? color
          .split('')
          .map((c) => c + c)
          .join('')
      : color;

  const opposite = (parseInt(formatted, 16) ^ 0xffffff).toString(16);

  return '#' + ('000000' + opposite).slice(-6);
};

export const getLighterColor = (color, percent) => {
  percent = percent || 100;
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  r = parseInt((r * (100 + percent)) / 100);
  g = parseInt((g * (100 + percent)) / 100);
  b = parseInt((b * (100 + percent)) / 100);

  r = r < 255 ? r : 255;
  g = g < 255 ? g : 255;
  b = b < 255 ? b : 255;

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  const RR =
    r.toString(16).length === 1 ? '0' + r.toString(16) : r.toString(16);
  const GG =
    g.toString(16).length === 1 ? '0' + g.toString(16) : g.toString(16);
  const BB =
    b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16);

  return '#' + RR + GG + BB;
};
