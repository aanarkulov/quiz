import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

import * as actions from '../../store/actions/quiz'
import * as types from '../../store/actions/actionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('quiz actions', () => {

    beforeEach(function () {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('fetchQuizes test', () => {

        // moxios.wait(() => {
        //     const request = moxios.requests.mostRecent()
        //     request.respondWith({
        //         status: 200,
        //         response: { data: [{ id: 1, name: 'Test 1' }] }
        //     })
        // })

        const expectedActions = [
            { type: types.FETCH_QUIZES_START },
            {
                type: types.FETCH_QUIZES_SUCCESS,
                quizes: [
                    // { id: 1, name: 'Test 1' }
                    {
                        "id": "-LWabCA8kOsgMyJXYhzl",
                        "name": "Тест № 1"
                    },
                    {
                        "id": "-LWauScqvpH6SJTR7lBA",
                        "name": "Тест № 2",
                    },
                    {
                        "id": "-LWh7HGLEfbTA0x1GzuC",
                        "name": "Тест № 3",
                    },
                ]
            }
        ]
        const store = mockStore({ quizes: [{ id: 1, name: 'Test 1' }] })

        return store.dispatch(actions.fetchQuizes()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    let expectedAction
    // delete
    // it('fetchQuizesStart test', () => {
    //     expectedAction = {
    //         type: types.FETCH_QUIZES_START,
    //     }
    //     expect(actions.fetchQuizesStart()).toEqual(expectedAction)
    // })

    // delete
    // it('fetchQuizesSuccess test', () => {
    //     const quizes = []
    //     expectedAction = {
    //         type: types.FETCH_QUIZES_SUCCESS,
    //         quizes
    //     }
    //     expect(actions.fetchQuizesSuccess(quizes)).toEqual(expectedAction)
    // })

    it('fetchQuizesError test', () => {
        const error = []
        expectedAction = {
            type: types.FETCH_QUIZES_ERROR,
            error
        }
        expect(actions.fetchQuizesError(error)).toEqual(expectedAction)
    })

    it('fetchQuizSuccess test', () => {
        const quiz = []
        expectedAction = {
            type: types.FETCH_QUIZ_START,
            quiz
        }
        expect(actions.fetchQuizSuccess(quiz)).toEqual(expectedAction)
    })

    it('quizSetState test', () => {
        const answerState = { 1: 'success' }
        const results = { 1: "error", 2: "success" }
        expectedAction = {
            type: types.QUIZ_SET_STATE,
            answerState, results
        }
        expect(actions.quizSetState(answerState, results)).toEqual(expectedAction)
    })

    it('finishedQuiz test', () => {
        expectedAction = {
            type: types.QUIZ_FINISHED
        }
        expect(actions.finishedQuiz()).toEqual(expectedAction)
    })

    it('quizNextQuestion test', () => {
        expectedAction = {
            type: types.QUIZ_NEXT_QUESTION,
            number: 1
        }
        expect(actions.quizNextQuestion(1)).toEqual(expectedAction)
    })

    it('isQuizFinished test', () => {
        const state = {
            activeQuestion: 2,
            quiz: [1, 2, 3]
        }
        expect(actions.isQuizFinished(state)).toBe(true)
    })

    // delete
    // it('retryQuiz test', () => {
    //     expectedAction = {
    //         type: types.QUIZ_RETRY
    //     }
    //     expect(actions.retryQuiz()).toEqual(expectedAction)
    // })

})