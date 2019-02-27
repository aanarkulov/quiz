import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../../store/actions/auth';
import * as types from '../../store/actions/actionTypes';

describe('auth actions', () => {
  let gen;
  let action;

  it('authLogout test', () => {
    const time = 3600;
    actions.delay(time);
    gen = actions.authLogout(time);
    expect(gen.next().value).toEqual(call(actions.delay, time));
    expect(gen.next().value).toEqual(put(actions.logout()));
  });

  it('auth test', () => {
    action = {
      email: '@gmail.com',
      password: 'passoword',
      isLogin: false,
    };
    gen = actions.auth(action);
    gen.next();

    action = {
      ...action,
      isLogin: true,
    };
    gen = actions.auth(action);
    gen.next();
  });

  it('watchAuth test', () => {
    gen = actions.watchAuth();
    expect(gen.next().value).toEqual(takeEvery(types.AUTH, actions.auth));
  });

  it('autoLogin test', () => {
    gen = actions.autoLogin();
    expect(gen.next().value).toEqual(put(actions.logout()));

    localStorage.setItem('token', 'token');
    gen = actions.autoLogin();
    expect(gen.next().value).toEqual(put(actions.logout()));
  });

  it('autoLogin if token did not expired', () => {
    localStorage.setItem('token', 'token');
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.removeItem('expirationDate');
    localStorage.setItem('expirationDate', expirationDate);
    gen = actions.autoLogin();
    expect(gen.next().value).toEqual(put(actions.authSuccess('token')));
    expect(gen.next().value.type).toEqual('CALL');
  });

  it('watchAutoLogin test', () => {
    gen = actions.watchAutoLogin();
    expect(gen.next().value).toEqual(takeEvery(types.AUTO_LOGIN, actions.autoLogin));
  });
});
