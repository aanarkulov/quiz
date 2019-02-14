import React from 'react';
import { shallow } from 'enzyme';
import { Quiz, mapStateToProps, mapDispatchToProps } from '../containers/Quiz/Quiz';

describe('Quiz container', () => {
  let wrapper;
  let defaultProps;
  function generateWrapper(passedProps) {
    defaultProps = {
      isFinished: false,
      activeQuestion: 0,
      loading: false,
      match: { params: { id: 'id' } },
      fetchQuizById: jest.fn(),
      quizAnswerClick: jest.fn(),
      retryQuiz: jest.fn(),
    };
    const props = { ...defaultProps, ...passedProps };

    return shallow(<Quiz {...props} />);
  }

  it('should render ActiveQuestion component', () => {
    const passedProps = {
      loading: false,
      quiz: [
        {
          id: 1,
          question: '',
          answers: [],
        },
      ],
    };
    wrapper = generateWrapper(passedProps);
    expect(wrapper.find('ActiveQuestion').exists()).toBe(true);
  });

  it('should render FinishedQuiz component', () => {
    const passedProps = {
      isFinished: true,
      quiz: [
        {
          id: 1,
          question: '',
        },
      ],
    };
    wrapper = generateWrapper(passedProps);
    expect(wrapper.find('FinishedQuiz').exists()).toBe(true);
  });

  it('componentWillUnmount test', () => {
    wrapper = generateWrapper();
    wrapper.unmount();
    expect(wrapper.find('Loader').exists()).toBe(false);
  });

  it('mapStateToProps test', () => {
    const quizReducer = {
      loading: true,
      quiz: [{}],
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    };
    const store = { quiz: quizReducer };
    expect(mapStateToProps(store)).toEqual(quizReducer);
  });

  it('mapDispatchToProps test', () => {
    const fetchQuizById = jest.fn();
    const quizAnswerClick = jest.fn();
    const retryQuiz = jest.fn();
    mapDispatchToProps(fetchQuizById).fetchQuizById();
    mapDispatchToProps(quizAnswerClick).quizAnswerClick();
    mapDispatchToProps(retryQuiz).retryQuiz();
    expect(typeof fetchQuizById.mock.calls[0][0]).toEqual('function');
    expect(typeof quizAnswerClick.mock.calls[0][0]).toEqual('function');
    expect(retryQuiz.mock.calls[0][0]).toEqual({ type: 'QUIZ_RETRY' });
  });
});
