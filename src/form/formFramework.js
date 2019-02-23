import is from 'is_js';

export const createControl = (config, validation) => ({
  ...config,
  validation,
  valid: !validation,
  touched: false,
  value: '',
});

export const validate = (value, validation = null) => {
  if (!validation) {
    return true;
  }
  let isValid = true;
  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (validation.email) {
    isValid = is.email(value) && isValid;
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }
  return isValid;
};

export const validateForm = (formControls) => {
  if (formControls) {
    Object.keys(formControls).forEach(control => (
      formControls[control].valid
    ));
  }
  return true;
};
