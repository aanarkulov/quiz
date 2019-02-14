import PropTypes from 'prop-types';
import validObjectItemIsString from '../utils/prop-types-object-validate';

describe('validObjectItem test', () => {
  it('Check if values are number return error', () => {
    const myPropTypes = { results: PropTypes.objectOf(validObjectItemIsString) };
    const props = { results: { 1: 123456, 2: 'success' } };

    console.error = jest.fn();
    PropTypes.checkPropTypes(myPropTypes, props, 'results', 'MyComponent');

    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
