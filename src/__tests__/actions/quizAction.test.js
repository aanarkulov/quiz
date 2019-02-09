import mockAxios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../store/actions/quiz'
import * as types from '../../store/actions/actionTypes'

describe('quiz actions', () => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)

    let store, expectedActions
    it('fetchQuizes test', async () => {
        store = mockStore()
        const quizes = [{ id: "0", name: 'Тест № 1' }]
        expectedActions = [
            { type: types.FETCH_QUIZES_START },
            { type: types.FETCH_QUIZES_SUCCESS, quizes }
        ]

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: quizes })
        )

        await store.dispatch(actions.fetchQuizes()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('fetchQuizById test', async () => {
        store = mockStore()
        const quiz = [{}]
        expectedActions = [
            { type: types.FETCH_QUIZES_START },
            { type: types.FETCH_QUIZ_START, quiz }
        ]

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: quiz })
        )

        await store.dispatch(actions.fetchQuizById()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    describe('quizAnswerClick test', () => {

        it('if answerClick true', async () => {
            store = mockStore({
                quiz: {
                    answerState: null,
                    activeQuestion: 0,
                    results: {},
                    quiz: [{
                        id: 1,
                        rightAnswerId: 1
                    }]
                }
            })
            await store.dispatch(actions.quizAnswerClick(1)).then(() => {
                expect(store.getActions()[0].results['1']).toEqual('success')
            })
        })

        it('if answerClick false', async () => {
            store = mockStore({
                quiz: {
                    answerState: null,
                    activeQuestion: 0,
                    results: {},
                    quiz: [{
                        id: 1,
                        rightAnswerId: 1
                    }]
                }
            })
            await store.dispatch(actions.quizAnswerClick(2)).then(() => {
                expect(store.getActions()[0].results['1']).toEqual('error')
            })
        })

        it('if answerState not null', async () => {
            expectedActions = [
                {
                    type: types.QUIZ_SET_STATE,
                    answerState: { 1: 'error' },
                    results: { 1: 'error' }
                }
            ]
            store = mockStore({
                quiz: {
                    answerState: { 1: 'error' },
                    activeQuestion: 0,
                    results: { 1: 'error' },
                    quiz: [{
                        id: 1,
                        rightAnswerId: 2
                    }]
                }
            })
            await store.dispatch(actions.quizAnswerClick(1)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it('isQuizFinished test', async () => {
            expectedActions = [
                {
                    type: types.QUIZ_SET_STATE,
                    answerState: { 1: 'error' },
                    results: { 1: 'error' }
                }
            ]
            store = mockStore({
                quiz: {
                    isQuizFinished: false,
                    answerState: {},
                    activeQuestion: 0,
                    results: {},
                    quiz: [{
                        id: 1,
                        rightAnswerId: 1
                    }]
                }
            })
            await store.dispatch(actions.quizAnswerClick(1)).then(() => {
                // console.log(store.getActions())
                // expect(store.getActions()).toEqual(expectedActions)
            })
        })

    })



    let expectedAction
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

})