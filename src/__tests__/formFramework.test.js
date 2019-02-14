import { validate, validateForm } from '../form/formFramework';

describe('formFrameowork test', () => {
  it('validate test', () => {
    expect(validate()).toBe(true);
    expect(validate('value', { minLength: 5 })).toBe(true);
  });

  it('validateForm test', () => {
    expect(validateForm()).toBe(true);
  });
});
