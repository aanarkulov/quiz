import authReducer from '../../store/reducers/auth'
import { AUTH_SUCCESS, AUTH_LOGOUT } from '../../store/actions/actionTypes'

describe('quizReducer test', () => {

    it('{ type: AUTH_SUCCESS }', () => {
        expect(authReducer(undefined, { type: AUTH_SUCCESS })).toEqual({ token: undefined })
    })

    it('{ type: AUTH_LOGOUT }', () => {
        expect(authReducer(undefined, { type: AUTH_LOGOUT })).toEqual({ token: null })
    })

    it('return default state', () => {
        expect(authReducer(undefined, { type: undefined })).toEqual({ token: null })
    })

})