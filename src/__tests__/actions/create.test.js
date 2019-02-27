import { takeEvery, select } from 'redux-saga/effects';
import * as actions from '../../store/actions/create';
import * as types from '../../store/actions/actionTypes';

describe('create actions', () => {
  it('createQuiz test', () => {
    const gen = actions.createQuiz();
    expect(gen.next().value).toEqual(select());
  });

  it('watchCreateQuiz test', () => {
    const gen = actions.watchCreateQuiz();
    expect(gen.next().value).toEqual(takeEvery(types.CREATE_QUIZ, actions.createQuiz));
  });
});
