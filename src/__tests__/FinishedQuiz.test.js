import React from 'react';
import { shallow } from 'enzyme';
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz';

describe('FinishedQuiz component', () => {
  let wrapper;
  let props;

  it('return i[className="fa fa-check "]', () => {
    props = {
      results: { 1: 'success' },
      quiz: [{ id: 1, question: '' }],
      onRetry: jest.fn(),
    };
    wrapper = shallow(<FinishedQuiz {...props} />);
    expect(wrapper.find('li').find('i').prop('className')).toEqual('fa fa-check ');
  });

  it('return i[className="fa fa-times "]', () => {
    props = {
      results: { 1: 'error' },
      quiz: [{ id: 1, question: '' }],
      onRetry: jest.fn(),
    };
    wrapper = shallow(<FinishedQuiz {...props} />);
    expect(wrapper.find('li').find('i').prop('className')).toEqual('fa fa-times ');
  });
});
