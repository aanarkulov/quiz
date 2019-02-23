import axios from 'axios';
import { put, call, select, takeEvery } from 'redux-saga/effects';
import { baseURL } from '../../settings';
import * as types from './actionTypes';

export const resetQuiz = () => ({ type: types.RESET_QUIZ });
export const createQuizItem = item => ({ type: types.CREATE_QUIZ_ITEM, item });

export function* createQuiz() {
  const state = yield select();
  yield call(axios.post, `${baseURL}/quizes.json`, state.create.quiz);
  yield put(resetQuiz());
}

export function* watchCreateQuiz() {
  yield takeEvery(types.CREATE_QUIZ, createQuiz);
}
