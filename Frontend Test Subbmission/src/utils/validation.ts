import { URLFormData, ValidationError } from '../types';

export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateShortcode = (shortcode: string): boolean => {
  const regex = /^[a-zA-Z0-9]{3,20}$/;
  return regex.test(shortcode);
};

export const validateValidityPeriod = (period: number): boolean => {
  return period >= 1 && period <= 1440 && Number.isInteger(period);
};

export const validateFormData = (data: URLFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate URL
  if (!data.originalUrl.trim()) {
    errors.push({ field: 'originalUrl', message: 'URL is required' });
  } else if (!validateURL(data.originalUrl)) {
    errors.push({ field: 'originalUrl', message: 'Please enter a valid URL (including http:// or https://)' });
  }

  // Validate validity period
  if (!validateValidityPeriod(data.validityPeriod)) {
    errors.push({ 
      field: 'validityPeriod', 
      message: 'Validity period must be a whole number between 1 and 1440 minutes' 
    });
  }

  // Validate custom shortcode if provided
  if (data.customShortcode && data.customShortcode.trim()) {
    if (!validateShortcode(data.customShortcode.trim())) {
      errors.push({ 
        field: 'customShortcode', 
        message: 'Custom shortcode must be 3-20 characters long and contain only letters and numbers' 
      });
    }
  }

  return errors;
};

export const formatValidationErrors = (errors: ValidationError[]): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};
  errors.forEach(error => {
    formattedErrors[error.field] = error.message;
  });
  return formattedErrors;
};