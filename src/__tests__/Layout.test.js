import React from 'react';
import { shallow } from 'enzyme';
import { Layout, mapStateToProps } from '../hoc/Layout/Layout';

describe('Layout test', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = { isAuthenticated: null };
    wrapper = shallow(<Layout {...props}>App</Layout>);
  });

  it('toggleMenuHandler test', () => {
    wrapper.instance().toggleMenuHandler();
    expect(wrapper.state('menu')).toBe(true);
  });

  it('menuCloseHandler test', () => {
    wrapper.instance().menuCloseHandler();
    expect(wrapper.state('menu')).toBe(false);
  });

  it('mapStateToProps test', () => {
    const store = { auth: { token: 'token' } };
    expect(mapStateToProps(store)).toEqual({ isAuthenticated: true });
  });
});
