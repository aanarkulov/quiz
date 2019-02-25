import * as types from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };
    case types.FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.FETCH_QUIZ_START:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };
    case types.QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case types.QUIZ_FINISHED:
      return {
        ...state,
        isFinished: true,
      };
    case types.QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    case types.QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      };
    default:
      return state;
  }
};
