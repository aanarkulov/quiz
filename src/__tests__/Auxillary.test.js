import React from 'react';
import { shallow } from 'enzyme';
import Auxillary from '../hoc/Auxillary/Auxillary';

describe('Auxillary hoc', () => {
  it('should render children', () => {
    const wrapper = shallow(
      <Auxillary>
        <li>list 1</li>
        <li>list 2</li>
      </Auxillary>,
    );
    expect(wrapper).toHaveLength(2);
  });
});
