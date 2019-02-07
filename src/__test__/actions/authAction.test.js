import * as actions from '../../store/actions/auth'
import * as types from '../../store/actions/actionTypes'

describe('auth actions', () => {

    let expectedAction
    it('authSuccess test', () => {
        const token = 'token'
        expectedAction = {
            type: types.AUTH_SUCCESS,
            token,
        }
        expect(actions.authSuccess(token)).toEqual(expectedAction)
    })

    it('logout test', () => {
        expectedAction = {
            type: types.AUTH_LOGOUT,
        }
        expect(actions.logout()).toEqual(expectedAction)
    })

})