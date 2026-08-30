import validator from 'validator';

export const validateEmail = (email) => {
  if (!email || !validator.isEmail(email)) {
    return 'Please provide a valid email address';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim().length < 10) {
    return 'Please provide a valid phone number (minimum 10 digits)';
  }
  const cleaned = phone.replace(/[\s\-()+]/g, '');
  if (!/^\d{10,15}$/.test(cleaned)) {
    return 'Please provide a valid phone number';
  }
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value, min, fieldName) => {
  if (value && value.trim().length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  return null;
};

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/[<>]/g, '');
};
