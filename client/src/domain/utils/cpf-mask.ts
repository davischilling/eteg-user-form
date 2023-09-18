export const cpfMask = (value: string) => {
  // Remove all non-digit characters
  const cleanedValue = value.replace(/\D/g, '');

  // Limit the cleaned value to 11 characters
  const limitedValue = cleanedValue.substring(0, 11);

  // Apply the CPF format to the limited value
  return limitedValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};
