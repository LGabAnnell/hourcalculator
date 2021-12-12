export const addZero: (v: number) => string = (v) => {
  if (v < 1) return '00';
  if (v < 10) return '0' + v;
  return `${v}`;
};
