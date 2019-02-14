import React from 'react';
import { shallow } from 'enzyme';
import Backdrop from '../components/UI/Backdrop/Backdrop';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import Loader from '../components/UI/Loader/Loader';
import Select from '../components/UI/Select/Select';

describe('UI components', () => {
  let wrapper;
  let props;

  it('Backdrop', () => {
    wrapper = shallow(<Backdrop onClick={jest.fn()} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Button', () => {
    props = {
      type: 'primary',
      children: 'click',
    };
    wrapper = shallow(<Button {...props} />);
    expect(wrapper.find('button').prop('disabled')).toBe(false);
  });

  it('Button disabled true', () => {
    props = {
      type: 'primary',
      children: 'click',
      disabled: true,
    };
    wrapper = shallow(<Button {...props} />);
    expect(wrapper.find('button').prop('disabled')).toBe(true);
  });

  it('Input', () => {
    props = {
      label: 'Email',
      value: '',
      onChange: jest.fn(),
    };
    wrapper = shallow(<Input {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('isInvalid test', () => {
    props = {
      label: 'Email',
      value: '',
      valid: false,
      touched: true,
      shouldValidate: { required: true, email: true },
      onChange: jest.fn(),
    };
    wrapper = shallow(<Input {...props} />);
    expect(wrapper.prop('className')).toEqual(' ');
  });

  it('Loader', () => {
    wrapper = shallow(<Loader />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Select', () => {
    props = {
      label: 'Select',
      value: 1,
      options: [{ text: '1', value: 1 }],
      onChange: jest.fn(),
    };
    wrapper = shallow(<Select {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
