import React from 'react';
import { shallow } from 'enzyme';
import { QuizCreator, mapStateToProps, mapDispatchToProps } from '../containers/QuizCreator/QuizCreator';

describe('QuizCreator container', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      quiz: [],
      createQuizQuestion: jest.fn(),
      finishCreateQuiz: jest.fn(),
    };
    wrapper = shallow(<QuizCreator {...props} />);
  });

  let event = { preventDefault: jest.fn() };
  it('submitHandler test', () => {
    wrapper.instance().submitHandler(event);
    expect(event.preventDefault.mock.calls[0]).toEqual([]);
  });

  it('addQuestionHandler test', () => {
    wrapper.instance().addQuestionHandler(event);
    expect(event.preventDefault.mock.calls[0]).toEqual([]);
  });

  it('createQuizHandler test', () => {
    wrapper.instance().createQuizHandler(event);
    expect(event.preventDefault.mock.calls[0]).toEqual([]);
  });

  it('selectChangeHandler test', () => {
    event = {
      preventDefault: jest.fn(),
      target: { value: 2 },
    };
    wrapper.instance().selectChangeHandler(event);
    expect(wrapper.state('rightAnswerId')).toEqual(2);
  });

  it('onChangeHandler test', () => {
    wrapper.instance().onChangeHandler('', 'question');
    expect(wrapper.state('isFormValid')).toBe(true);
  });

  it('Input onChangeHandler test', () => {
    wrapper.find('Input').first().simulate('change', { target: { value: '' } });
    expect(wrapper.state('isFormValid')).toBe(true);
  });

  it('mapStateToProps test', () => {
    const quiz = { quiz: [{}] };
    const store = { create: quiz };
    expect(mapStateToProps(store)).toEqual(quiz);
  });

  it('mapDispatchToProps test', () => {
    const createQuizQuestion = jest.fn();
    const finishCreateQuiz = jest.fn();
    mapDispatchToProps(createQuizQuestion).createQuizQuestion('question');
    mapDispatchToProps(finishCreateQuiz).finishCreateQuiz();
    expect(createQuizQuestion.mock.calls[0][0]).toEqual({ type: 'CREATE_QUIZ_QUESTION', item: 'question' });
    expect(typeof finishCreateQuiz.mock.calls[0][0]).toEqual('function');
  });
});
