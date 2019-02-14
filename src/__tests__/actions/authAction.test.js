import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../store/actions/auth';
import * as types from '../../store/actions/actionTypes';

describe('auth actions', () => {
  let store;
  let expectedActions;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it('autLogout test', () => {
    store = mockStore();
    expectedActions = [{ type: types.AUTH_LOGOUT }];
    jest.useFakeTimers();
    store.dispatch(actions.autLogout());
    jest.runAllTimers();
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('auth test', async () => {
    store = mockStore();
    expectedActions = [{ type: types.AUTH_SUCCESS, token: undefined }];
    await store.dispatch(actions.auth('email', 'password', true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('auth test for signup', async () => {
    store = mockStore();
    await store.dispatch(actions.auth('email', 'password', false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('autoLogin test', () => {
    it('authSuccess if token exists', () => {
      store = mockStore();
      expectedActions = [{ type: types.AUTH_SUCCESS, token: 'token' }];

      localStorage.setItem('token', 'token');
      store.dispatch(actions.autoLogin());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('logout if token does not exists', () => {
      store = mockStore();
      expectedActions = [{ type: types.AUTH_LOGOUT }];

      localStorage.removeItem('token');
      store.dispatch(actions.autoLogin());
      expect(store.getActions()).toEqual(expectedActions);
    });

    // it('logout if token expiration', () => {
    //   store = mockStore();
    //   expectedActions = [{ type: types.AUTH_LOGOUT }];

    //   const expirationDate = new Date();
    //   localStorage.setItem('expirationDate', expirationDate);
    //   store.dispatch(actions.autoLogin());
    //   expect(store.getActions()).toEqual(expectedActions);
    // });
  });
});
