import create from '../../store/reducers/create';
import * as types from '../../store/actions/actionTypes';

describe('quizReducer test', () => {
  it('{ type: CREATE_QUIZ_ITEM }', () => {
    expect(create(undefined,
      { type: types.CREATE_QUIZ_ITEM })).toEqual({ quiz: [undefined] });
  });

  it('{ type: RESET_QUIZ }', () => {
    expect(create(undefined, { type: types.RESET_QUIZ })).toEqual({ quiz: [] });
  });

  it('return default state', () => {
    expect(create(undefined, { type: undefined })).toEqual({ quiz: [] });
  });
});
