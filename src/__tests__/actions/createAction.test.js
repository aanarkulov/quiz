import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../store/actions/create'
import * as types from '../../store/actions/actionTypes'

describe('create actions', () => {

    it('finishCreateQuiz test', async () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({
            create: {
                quiz: {}
            }
        })
        const expectedActions = [{ type: types.RESET_QUIZ_CREATION }]

        await store.dispatch(actions.finishCreateQuiz())
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('createQuizQuestion test', () => {
        const item = []
        const expectedAction = {
            type: types.CREATE_QUIZ_QUESTION,
            item,
        }
        expect(actions.createQuizQuestion(item)).toEqual(expectedAction)
    })

})