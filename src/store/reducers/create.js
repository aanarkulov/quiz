import * as types from '../actions/actionTypes';

const initialState = { quiz: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_QUIZ_ITEM:
      return {
        ...state,
        quiz: [...state.quiz, action.item],
      };
    case types.RESET_QUIZ:
      return {
        ...state,
        quiz: [],
      };
    default:
      return state;
  }
};
