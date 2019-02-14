import React from 'react';
import { shallow } from 'enzyme';
import Drawer from '../components/Navigation/Drawer/Drawer';

describe('Drawer component', () => {
  let wrapper;
  let props;

  it('should render NavLink[to="/logout"]', () => {
    props = {
      isOpen: false,
      isAuthenticated: true,
      onClose: jest.fn(),
    };
    wrapper = shallow(<Drawer {...props} />);
    expect(wrapper.find('NavLink[to="/logout"]').exists()).toBe(true);
  });


  it('onClose test', () => {
    props = {
      isOpen: true,
      onClose: jest.fn(),
    };
    wrapper = shallow(<Drawer {...props} />);
    wrapper.find('NavLink').first().simulate('click');
    expect(props.onClose.mock.calls[0]).toEqual([]);
  });
});
