export const onValidateNumberInput = (
  value: number,
  validateMessage: string
) => {
  if (value <= 0) {
    return validateMessage;
  }
};
