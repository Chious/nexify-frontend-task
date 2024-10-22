export const TimetoDate = (time: string) => {
  if (!time) return '';
  return time.split('T')[0];
};

export const DateToTime = (date: string) => {
  if (!date) return '';
  return date + 'T00:00:00';
};
