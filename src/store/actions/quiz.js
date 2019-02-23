import axios from 'axios';
import { put, takeEvery, call, select } from 'redux-saga/effects';
import { baseURL } from '../../settings';
import * as types from './actionTypes';

export const fetchQuizesStart = () => ({ type: types.FETCH_QUIZES_START });
export const fetchQuizesSuccess = quizes => ({ type: types.FETCH_QUIZES_SUCCESS, quizes });
export const fetchQuizesError = error => ({ type: types.FETCH_QUIZES_ERROR, error });
export const fetchQuizSuccess = quiz => ({ type: types.FETCH_QUIZ_START, quiz });
export const finishedQuiz = () => ({ type: types.QUIZ_FINISHED });
export const quizNextQuestion = number => ({ type: types.QUIZ_NEXT_QUESTION, number });
export const quizSetState = (answerState, results) => ({
  type: types.QUIZ_SET_STATE,
  answerState,
  results,
});

export const isQuizFinished = state => state.activeQuestion + 1 === state.quiz.length;

export function* fetchQuizes() {
  yield put(fetchQuizesStart());
  try {
    const quizes = [];
    const response = yield call(axios, `${baseURL}/quizes.json`);
    Object.keys(response.data).forEach((key, index) => {
      quizes.push({
        id: key,
        name: `Тест № ${index + 1}`,
      });
    });
    yield put(fetchQuizesSuccess(quizes));
  } catch (e) {
    yield put(fetchQuizesError(e));
  }
}

export function* watchFetchQuizes() {
  yield takeEvery(types.FETCH_QUIZES, fetchQuizes);
}

export function* fetchQuizById(quizId) {
  yield put(fetchQuizesStart());
  try {
    const response = yield call(axios, `${baseURL}/quizes/${quizId}.json`);
    yield put(fetchQuizSuccess(response.data));
  } catch (e) {
    yield put(fetchQuizesError(e));
  }
}

export function* fetchQuizByID(action) {
  yield call(fetchQuizById, action.quizId);
}

export function* watchfetchQuizById() {
  yield takeEvery(types.FETCH_QUIZ_BY_ID, fetchQuizByID);
}

const delay = () => new Promise(res => setTimeout(res, 1000));

export function* showSuccessState(state) {
  yield call(delay);
  if (isQuizFinished(state)) {
    yield put(finishedQuiz());
  } else {
    yield put(quizNextQuestion(state.activeQuestion + 1));
  }
}

export function* quizAnswerClick(answerId) {
  let state = yield select();
  state = state.quiz;
  if (state.answerState) {
    const key = Object.keys(state.answerState)[0];
    if (state.answerState[key] === 'success') {
      yield;
    }
  }

  const question = state.quiz[state.activeQuestion];
  const { results } = state;

  if (question.rightAnswerId === answerId) {
    if (!results[question.id]) {
      results[question.id] = 'success';
    }
    yield put(quizSetState({ [answerId]: 'success' }, results));
    yield call(showSuccessState, state);
  } else {
    results[question.id] = 'error';
    yield put(quizSetState({ [answerId]: 'error' }, results));
  }
}

export function* quizAnswerCLICK(action) {
  yield call(quizAnswerClick, action.answerId);
}

export function* watchQuizAnswerClick() {
  yield takeEvery(types.QUIZ_ANSWER_CLICK, quizAnswerCLICK);
}
