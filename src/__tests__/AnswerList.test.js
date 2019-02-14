import React from 'react';
import { shallow } from 'enzyme';
import AnswerList from '../components/ActiveQuestion/AnswerList/AnswerList';

describe('AnswerList component', () => {
  let wrapper;
  let props;

  it('should render', () => {
    props = {
      answers: [{ id: 1, text: '' }],
      state: { 1: 'success' },
      onAnswerClick: jest.fn(),
    };
    wrapper = shallow(<AnswerList {...props} />);
    expect(wrapper.find('AnswerItem').prop('state')).toEqual('success');
  });

  it('props state: null', () => {
    props = {
      answers: [{ id: 1, text: '' }],
      onAnswerClick: jest.fn(),
    };
    wrapper = shallow(<AnswerList {...props} />);
    expect(wrapper.find('AnswerItem').prop('state')).toBe(null);
  });
});
