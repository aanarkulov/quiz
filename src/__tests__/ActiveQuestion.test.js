import React from 'react';
import { shallow } from 'enzyme';
import ActiveQuestion from '../components/ActiveQuestion/ActiveQuestion';

describe('ActiveQuestion component', () => {
  it('should render AnswerList component', () => {
    const props = {
      question: 'question',
      answers: [{ id: 1, text: '' }],
      answerNumber: 1,
      state: { 1: 'success' },
      quizLength: 1,
      onAnswerClick: jest.fn(),
    };
    const wrapper = shallow(<ActiveQuestion {...props} />);
    expect(wrapper.find('AnswerList').exists()).toBe(true);
  });
});
