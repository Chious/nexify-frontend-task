export const validateWithRegex = (rule: string, value: string) => {
  const regex = new RegExp(rule);
  return regex.test(value);
};
