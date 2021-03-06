import { put, call, takeEvery } from 'redux-saga/effects';
import { API_KEY } from '../../settings';
import * as types from './actionTypes';

export const authSuccess = token => ({
  type: types.AUTH_SUCCESS,
  token,
});

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return { type: types.AUTH_LOGOUT };
}

export const delay = time => new Promise(res => setTimeout(res, time * 1000));
export function* authLogout(time) {
  yield call(delay, time);
  yield put(logout());
}

export function* auth(action) {
  const { email, password, isLogin } = action;
  const authData = { email, password, returnSecureToken: true };
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;

  if (isLogin) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
  }
  const data = yield fetch(url, { method: 'post', body: JSON.stringify(authData) }).then(res => res.json());
  const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
  localStorage.setItem('token', data.idToken);
  localStorage.setItem('userId', data.localId);
  localStorage.setItem('expirationDate', expirationDate);
  yield put(authSuccess(data.idToken));
  yield call(authLogout, data.expiresIn);
}

export function* watchAuth() {
  yield takeEvery(types.AUTH, auth);
}

export function* autoLogin() {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(logout());
    } else {
      yield put(authSuccess(token));
      yield call(authLogout, (expirationDate.getTime() - new Date().getTime()) / 1000);
    }
  }
}

export function* watchAutoLogin() {
  yield takeEvery(types.AUTO_LOGIN, autoLogin);
}
