import React from 'react';
import { shallow } from 'enzyme';
import { QuizCreator, mapStateToProps, mapDispatchToProps } from '../containers/QuizCreator/QuizCreator';

describe('QuizCreator container', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      quiz: [{
        id: 1,
        question: 'question',
        rightAnswerId: 1,
        answers: [{
          id: 1,
          text: 'text',
        }],
      }],
      createQuizItem: jest.fn(),
      createQuiz: jest.fn(),
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
    const createQuizItem = jest.fn();
    const createQuiz = jest.fn();
    mapDispatchToProps(createQuizItem).createQuizItem('question');
    mapDispatchToProps(createQuiz).createQuiz();
    expect(createQuizItem.mock.calls[0][0]).toEqual({ type: 'CREATE_QUIZ_ITEM', item: 'question' });
    expect(createQuiz.mock.calls[0][0]).toEqual({ type: 'CREATE_QUIZ' });
  });
});
