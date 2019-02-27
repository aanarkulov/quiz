import auth from '../../store/reducers/auth';
import * as types from '../../store/actions/actionTypes';

describe('quizReducer test', () => {
  it('{ type: AUTH_SUCCESS }', () => {
    expect(auth(undefined, { type: types.AUTH_SUCCESS })).toEqual({ token: undefined });
  });

  it('{ type: AUTH_LOGOUT }', () => {
    expect(auth(undefined, { type: types.AUTH_LOGOUT })).toEqual({ token: null });
  });

  it('return default state', () => {
    expect(auth(undefined, { type: undefined })).toEqual({ token: null });
  });
});
