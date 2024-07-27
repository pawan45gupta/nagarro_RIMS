// utils/formatting.js

export const formatCardNumber = (value) => {
  return value
    .replace(/\s?/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
};

export const formatExpiryDate = (value) => {
  return value.replace(/(\d{2})(\d{2})/, '$1/$2');
};
