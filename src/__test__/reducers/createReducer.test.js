import createReducer from '../../store/reducers/create'
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from '../../store/actions/actionTypes'

describe('quizReducer test', () => {

    it('{ type: CREATE_QUIZ_QUESTION }', () => {
        expect(createReducer(undefined, { type: CREATE_QUIZ_QUESTION })).toEqual({ quiz: [undefined] })
    })

    it('{ type: RESET_QUIZ_CREATION }', () => {
        expect(createReducer(undefined, { type: RESET_QUIZ_CREATION })).toEqual({ quiz: [] })
    })

    it('return default state', () => {
        expect(createReducer(undefined, { type: undefined })).toEqual({ quiz: [] })
    })

})