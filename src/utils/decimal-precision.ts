export const formatDecimalPrecision = (value: number | string): string => {
  let stringValue = `${value}`;

  if (typeof value == 'number') stringValue = value.toLocaleString('fullwide', { useGrouping: false });

  return value ? stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
};

