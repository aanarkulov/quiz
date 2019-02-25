import * as types from '../actions/actionTypes';

const initialState = { token: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
      };
    case types.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};
