import mockAxios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../store/actions/auth'
import * as types from '../../store/actions/actionTypes'

describe('auth actions', () => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)

    it('auth test', async () => {
        const store = mockStore()
        const expectedActions = [{ type: types.AUTH_SUCCESS, token: undefined }]

        await store.dispatch(actions.auth()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
        await store.dispatch(actions.auth('email', 'password', true)).then(() => {
            expect(store.getActions()[1].type).toEqual(types.AUTH_SUCCESS)
        })
    })

    it('autoLogin test', () => {
        const store = mockStore()
        const expectedActions = [{ type: types.AUTH_SUCCESS, token: 'undefined' }]

        store.dispatch(actions.autoLogin())
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('autLogout test', () => {
        const store = mockStore()
        const expectedActions = [{ type: types.AUTH_LOGOUT }]

        jest.useFakeTimers()
        store.dispatch(actions.autLogout())
        jest.runAllTimers()
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('logout test', () => {
        const expectedAction = {
            type: types.AUTH_LOGOUT,
        }
        expect(actions.logout()).toEqual(expectedAction)
    })

})