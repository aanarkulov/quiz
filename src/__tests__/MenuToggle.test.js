import React from 'react';
import { shallow } from 'enzyme';
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle';

describe('MenuToggle component', () => {
  let wrapper;
  let props;

  it('if isOpen false return i[className=" fa fa-bars"]', () => {
    props = {
      isOpen: false,
      onToggle: jest.fn(),
    };
    wrapper = shallow(<MenuToggle {...props} />);
    expect(wrapper.prop('className')).toEqual(' fa fa-bars');
  });

  it('if isOpen true return i[className=" fa fa-times "]', () => {
    props = {
      isOpen: true,
      onToggle: jest.fn(),
    };
    wrapper = shallow(<MenuToggle {...props} />);
    expect(wrapper.prop('className')).toEqual(' fa fa-times ');
  });
});
