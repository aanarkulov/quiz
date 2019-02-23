import { all } from 'redux-saga/effects';
import { watchFetchQuizes, watchfetchQuizById, watchQuizAnswerClick } from './quiz';
import { watchAuth, watchAutoLogin } from './auth';
import { watchCreateQuiz } from './create';

export default function* rootSaga() {
  yield all([
    watchFetchQuizes(),
    watchfetchQuizById(),
    watchQuizAnswerClick(),
    watchAuth(),
    watchAutoLogin(),
    watchCreateQuiz(),
  ]);
}
