export const validateEmail = (email) => {
  if (!email?.trim()) return 'Email is required';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) return 'Please enter a valid email address';
  return '';
};

export const validatePhone = (phone) => {
  if (!phone?.trim()) return 'Phone number is required';
  const cleaned = phone.replace(/[\s\-()+]/g, '');
  if (!/^\d{10,15}$/.test(cleaned)) return 'Please enter a valid phone number';
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value?.trim()) return `${fieldName} is required`;
  return '';
};

export const validateMinLength = (value, min, fieldName) => {
  if (value?.trim().length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  return '';
};

export const validateForm = (fields) => {
  const errors = {};
  Object.entries(fields).forEach(([key, { value, validators }]) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  });
  return errors;
};
