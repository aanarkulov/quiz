import React from 'react';
import { shallow } from 'enzyme';
import { Auth, mapDispatchToProps } from '../containers/Auth/Auth';

describe('Auth container', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = { auth: jest.fn() };
    wrapper = shallow(<Auth {...props} />);
  });

  it('loginHandler test', () => {
    wrapper.instance().loginHandler();
    expect(props.auth.mock.calls[0][2]).toBe(true);
  });

  it('registerHandler test', () => {
    wrapper.instance().registerHandler();
    expect(props.auth.mock.calls[0][2]).toBe(false);
  });

  it('submitHandler test', () => {
    const event = { preventDefault: jest.fn() };
    wrapper.instance().submitHandler(event);
    expect(event.preventDefault.mock.calls[0]).toEqual([]);
  });

  it('onChangeHandler test', () => {
    wrapper.instance().onChangeHandler('a.anarkuloff@gmail.com', 'email');
    expect(wrapper.state('isFormValid')).toBe(true);
  });

  it('Input onChangeHandler test', () => {
    props = { auth: jest.fn() };
    wrapper = shallow(<Auth {...props} />);
    wrapper.find('Input').first().simulate('change', { target: { value: '' } });
    expect(wrapper.state('isFormValid')).toBe(true);
  });

  it('mapDispatchToProps test', () => {
    const auth = jest.fn();
    mapDispatchToProps(auth).auth();
    expect(typeof auth.mock.calls[0][0]).toEqual('function');
  });
});
