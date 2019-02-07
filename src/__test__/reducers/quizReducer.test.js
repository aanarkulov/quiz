import quizReducer from '../../store/reducers/quiz'
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_START,
    QUIZ_SET_STATE,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from '../../store/actions/actionTypes'

describe('quizReducer test', () => {

    it('{ type: FETCH_QUIZES_START }', () => {
        expect(quizReducer(undefined, { type: FETCH_QUIZES_START }).loading).toBe(true)
    })

    it('{ type: FETCH_QUIZES_SUCCESS }', () => {
        expect(quizReducer(undefined, { type: FETCH_QUIZES_SUCCESS }).quizes).toBe(undefined)
    })

    it('{ type: FETCH_QUIZES_ERROR }', () => {
        expect(quizReducer(undefined, { type: FETCH_QUIZES_ERROR }).error).toBe(undefined)
    })

    it('{ type: FETCH_QUIZ_START }', () => {
        expect(quizReducer(undefined, { type: FETCH_QUIZ_START }).quiz).toBe(undefined)
    })

    it('{ type: QUIZ_SET_STATE }', () => {
        expect(quizReducer(undefined, { type: QUIZ_SET_STATE }).answerState).toBe(undefined)
    })

    it('{ type: QUIZ_FINISHED }', () => {
        expect(quizReducer(undefined, { type: QUIZ_FINISHED }).isFinished).toBe(true)
    })

    it('{ type: QUIZ_NEXT_QUESTION }', () => {
        expect(quizReducer(undefined, { type: QUIZ_NEXT_QUESTION }).answerState).toBe(null)
    })

    it('{ type: QUIZ_RETRY }', () => {
        expect(quizReducer(undefined, { type: QUIZ_RETRY }).results).toEqual({})
    })

    it('return default state', () => {
        expect(quizReducer(undefined, { type: undefined }).quizes).toEqual([])
    })

})