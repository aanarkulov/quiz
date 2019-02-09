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

    it('fetchQuizes response error', async () => {
        store = mockStore()

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve()
        )

        await store.dispatch(actions.fetchQuizes()).then(() => {
            expect(store.getActions()[1].type).toEqual(types.FETCH_QUIZES_ERROR)
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

    it('fetchQuizById response error', async () => {
        store = mockStore()

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve()
        )

        await store.dispatch(actions.fetchQuizById()).then(() => {
            expect(store.getActions()[1].type).toEqual(types.FETCH_QUIZES_ERROR)
        })
    })

    describe('quizAnswerClick test', () => {

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
            store = mockStore({
                quiz: {
                    answerState: { 1: 'success' },
                }
            })

            await store.dispatch(actions.quizAnswerClick(1))
        })

        it('!results[question.id]', async () => {
            store = mockStore({
                quiz: {
                    answerState: null,
                    activeQuestion: 1,
                    results: { 2: 'success' },
                    quiz: [
                        {
                            id: 1,
                            rightAnswerId: 1
                        },
                        {
                            id: 2,
                            rightAnswerId: 2
                        }
                    ]
                }
            })

            await store.dispatch(actions.quizAnswerClick(2))
            expect(store.getActions()[0].results['2']).toEqual('success')
        })

        it('isQuizFinished test', async () => {
            expectedActions = [
                {
                    type: types.QUIZ_SET_STATE,
                    answerState: { 1: 'success' },
                    results: { 1: 'success' }
                },
                { type: types.QUIZ_FINISHED }
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

            jest.useFakeTimers()
            await store.dispatch(actions.quizAnswerClick(1)).then(() => {
                store.getActions()
                // expect(store.getActions()).toEqual(expectedActions)
            })
            jest.runAllTimers()
        })

        it('quizNextQuestion test', async () => {
            expectedActions = [
                {
                    type: types.QUIZ_SET_STATE,
                    answerState: { 1: 'success' },
                    results: { 1: 'success' }
                },
                {
                    type: types.QUIZ_NEXT_QUESTION,
                    number: 1
                }
            ]
            store = mockStore({
                quiz: {
                    isQuizFinished: false,
                    answerState: {},
                    activeQuestion: 0,
                    results: {},
                    quiz: [
                        {
                            id: 1,
                            rightAnswerId: 1
                        },
                        {
                            id: 2,
                            rightAnswerId: 2
                        }
                    ]
                }
            })

            jest.useFakeTimers()
            await store.dispatch(actions.quizAnswerClick(1)).then(() => {
                store.getActions()
                // expect(store.getActions()).toEqual(expectedActions)
            })
            jest.runAllTimers()
        })

    })

})