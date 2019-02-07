import * as actions from '../../store/actions/create'
import * as types from '../../store/actions/actionTypes'

describe('create actions', () => {

    let expectedAction
    it('createQuizQuestion test', () => {
        const item = []
        expectedAction = {
            type: types.CREATE_QUIZ_QUESTION,
            item,
        }
        expect(actions.createQuizQuestion(item)).toEqual(expectedAction)
    })

    it('resetQuizCreation test', () => {
        expectedAction = {
            type: types.RESET_QUIZ_CREATION,
        }
        expect(actions.resetQuizCreation()).toEqual(expectedAction)
    })

})