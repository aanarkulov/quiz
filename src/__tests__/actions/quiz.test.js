import { put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../store/actions/quiz';
import * as types from '../../store/actions/actionTypes';
// import rootSaga from '../../store/actions/rootSaga';

describe('quiz actions test', () => {
  let gen;
  it('fetchQuizes test', () => {
    gen = actions.fetchQuizes();
    expect(gen.next().value).toEqual(put(actions.fetchQuizesStart()));
  });

  it('fetchQuizes response error', () => {
    gen = actions.fetchQuizes();
    gen.next();
    gen.next();
    const genErr = gen.next();
    expect(genErr.value).toEqual(put(actions.fetchQuizesError(genErr.value.payload.action.error)));
  });

  it('watchFetchQuizes test', () => {
    gen = actions.watchFetchQuizes();
    expect(gen.next().value).toEqual(takeEvery(types.FETCH_QUIZES, actions.fetchQuizes));
  });

  const action = { quizId: 1 };
  it('fetchQuizById test', () => {
    gen = actions.fetchQuizById(action);
    expect(gen.next().value).toEqual(put(actions.fetchQuizesStart()));
    gen.next();
    expect(gen.next().value).toEqual(put(actions.fetchQuizSuccess()));
  });

  it('watchFetchQuizById test', () => {
    gen = actions.watchfetchQuizById();
    expect(gen.next().value).toEqual(takeEvery(types.FETCH_QUIZ_BY_ID, actions.fetchQuizById));
  });

  it('watchQuizAnswerClick test', () => {
    gen = actions.watchQuizAnswerClick();
    expect(gen.next().value).toEqual(takeEvery(types.QUIZ_ANSWER_CLICK, actions.quizAnswerClick));
  });
});
