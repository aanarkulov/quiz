import React from 'react';
import { shallow } from 'enzyme';
import AnswerItem from '../components/ActiveQuestion/AnswerList/AnswerItem/AnswerItem';

describe('AnswerItem component', () => {
  let wrapper;
  let props;

  it('onAnswerClick test', () => {
    props = {
      answer: { id: 1, text: '' },
      state: 'success',
      onAnswerClick: jest.fn(),
    };
    wrapper = shallow(<AnswerItem {...props} />);
    wrapper.find('div').simulate('click');
    wrapper.find('div').simulate('keyPress');
    expect(props.onAnswerClick.mock.calls[0][0]).toEqual(1);
  });

  it('if props the state is null', () => {
    props = {
      answer: { id: 1, text: '' },
      onAnswerClick: jest.fn(),
    };
    wrapper = shallow(<AnswerItem {...props} />);
    expect(wrapper.find('li').prop('className')).toEqual('');
  });
});
