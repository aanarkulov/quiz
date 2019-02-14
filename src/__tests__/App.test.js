import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from '../App';

describe('App test', () => {
  let wrapper;
  let props;

  it('should render Switch', () => {
    props = { autoLogin: jest.fn() };
    wrapper = shallow(<App {...props} />);
    expect(wrapper.find('Connect(Layout)').exists()).toBe(true);
  });

  it('should render Route[path="/logout"] if isAuthenticated true', () => {
    props = {
      isAuthenticated: true,
      autoLogin: jest.fn(),
    };
    wrapper = shallow(<App {...props} />);
    expect(wrapper.find('Route[path="/logout"]').prop('path')).toEqual('/logout');
  });

  it('mapStateToProps test', () => {
    const store = { auth: { token: 'token' } };
    expect(mapStateToProps(store)).toEqual({ isAuthenticated: true });
  });

  it('mapDispatchToProps test', () => {
    const autoLogin = jest.fn();
    mapDispatchToProps(autoLogin).autoLogin();
    expect(typeof autoLogin.mock.calls[0][0]).toEqual('function');
  });
});
