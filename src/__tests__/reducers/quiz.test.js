import quiz from '../../store/reducers/quiz';
import * as types from '../../store/actions/actionTypes';

describe('quizReducer test', () => {
  it('{ type: FETCH_QUIZES_START }', () => {
    expect(quiz(undefined, { type: types.FETCH_QUIZES_START }).loading).toBe(true);
  });

  it('{ type: FETCH_QUIZES_SUCCESS }', () => {
    expect(quiz(undefined, { type: types.FETCH_QUIZES_SUCCESS }).quizes).toBe(undefined);
  });

  it('{ type: FETCH_QUIZES_ERROR }', () => {
    expect(quiz(undefined, { type: types.FETCH_QUIZES_ERROR }).error).toBe(undefined);
  });

  it('{ type: FETCH_QUIZ_START }', () => {
    expect(quiz(undefined, { type: types.FETCH_QUIZ_START }).quiz).toBe(undefined);
  });

  it('{ type: QUIZ_SET_STATE }', () => {
    expect(quiz(undefined, { type: types.QUIZ_SET_STATE }).answerState).toBe(undefined);
  });

  it('{ type: QUIZ_FINISHED }', () => {
    expect(quiz(undefined, { type: types.QUIZ_FINISHED }).isFinished).toBe(true);
  });

  it('{ type: QUIZ_NEXT_QUESTION }', () => {
    expect(quiz(undefined, { type: types.QUIZ_NEXT_QUESTION }).answerState).toBe(null);
  });

  it('{ type: QUIZ_RETRY }', () => {
    expect(quiz(undefined, { type: types.QUIZ_RETRY }).results).toEqual({});
  });

  it('return default state', () => {
    expect(quiz(undefined, { type: undefined }).quizes).toEqual([]);
  });
});
