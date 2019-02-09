import React from 'react'
import { shallow } from 'enzyme'

import { QuizCreator, mapStateToProps, mapDispatchToProps } from '../containers/QuizCreator/QuizCreator'

describe('QuizCreator container', () => {

    let wrapper
    beforeEach(() => {
        const props = {
            quiz: [],
            createQuizQuestion: jest.fn(),
            finishCreateQuiz: jest.fn()
        }
        wrapper = shallow(<QuizCreator {...props} />)
    })

    it('should render Auxillary components', () => {
        expect(wrapper.find('Auxillary').exists()).toBe(true)
    })

    it('methods of Auth test', () => {
        const event = {
            preventDefault: jest.fn(),
            target: { value: 1 }
        }

        expect(wrapper.instance().submitHandler(event)).toBe(undefined)
        expect(wrapper.instance().addQuestionHandler(event)).toBe(undefined)
        expect(wrapper.instance().createQuizHandler(event)).toBe(undefined)
        expect(wrapper.instance().selectChangeHandler(event)).toBe(undefined)
        expect(wrapper.instance().onChangeHandler('question', 'question')).toBe(undefined)
    })

    it("mapStateToProps test", () => {
        const store = { create: { quiz: [{}] } }

        expect(mapStateToProps(store)).toEqual({ quiz: [{}] })
    })

    it('mapDispatchToProps test', () => {
        const createQuizQuestion = jest.fn();
        const finishCreateQuiz = jest.fn();

        mapDispatchToProps(createQuizQuestion).createQuizQuestion('question')
        mapDispatchToProps(finishCreateQuiz).finishCreateQuiz()

        expect(createQuizQuestion.mock.calls[0][0]).toEqual({ type: 'CREATE_QUIZ_QUESTION', item: 'question' })
    })

    it('Input onChangeHandler test', () => {
        const onChangeHandler = jest.fn();

        wrapper.find('Input').first().simulate('change', {
            target: { value: '' }
        })

        expect(onChangeHandler.mock.calls).toEqual([])
    })

})