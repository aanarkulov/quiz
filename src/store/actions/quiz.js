import { put, takeEvery, call, select } from 'redux-saga/effects';
import { baseURL } from '../../settings';
import * as types from './actionTypes';
import { mapStateToProps } from '../../containers/Quiz/Quiz';

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
    const data = yield fetch(`${baseURL}/quizes.json`).then(res => res.json());
    Object.keys(data).forEach((key, index) => {
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

export function* fetchQuizById(action) {
  const { quizId } = action;
  yield put(fetchQuizesStart());
  try {
    const data = yield fetch(`${baseURL}/quizes/${quizId}.json`).then(res => res.json());
    yield put(fetchQuizSuccess(data));
  } catch (e) {
    yield put(fetchQuizesError(e));
  }
}

export function* watchfetchQuizById() {
  yield takeEvery(types.FETCH_QUIZ_BY_ID, fetchQuizById);
}

export function* quizAnswerClick(action) {
  const { answerId } = action;
  const state = yield select(mapStateToProps);
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
    yield call(() => new Promise(res => setTimeout(res, 1000)));
    if (isQuizFinished(state)) {
      yield put(finishedQuiz());
    } else {
      yield put(quizNextQuestion(state.activeQuestion + 1));
    }
  } else {
    results[question.id] = 'error';
    yield put(quizSetState({ [answerId]: 'error' }, results));
  }
}

export function* watchQuizAnswerClick() {
  yield takeEvery(types.QUIZ_ANSWER_CLICK, quizAnswerClick);
}
