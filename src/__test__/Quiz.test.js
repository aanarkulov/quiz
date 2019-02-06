import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Quiz, mapStateToProps, mapDispatchToProps } from '../containers/Quiz/Quiz'
import ActiveQuestion from '../components/ActiveQuestion/ActiveQuestion'
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz'

describe('Quiz container', () => {

    let wrapper, defaultProps
    function generateWrapper(passedProps) {
        defaultProps = {
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            quiz: null,
            loading: false,
            match: {
                params: { id: 1 }
            },
            fetchQuizById: jest.fn(),
            quizAnswerClick: jest.fn(),
            retryQuiz: jest.fn()
        }
        const props = { ...defaultProps, ...passedProps }

        return shallow(<Quiz {...props} />)
    }

    describe('should render component:', () => {
        it('ActiveQuestion', () => {
            const passedProps = {
                loading: false,
                quiz: [1]
            }
            wrapper = generateWrapper(passedProps)

            expect(wrapper.find(ActiveQuestion).exists()).toBe(true)
        })

        it('FinishedQuiz', () => {
            const passedProps = {
                isFinished: true,
                quiz: [1]
            }
            wrapper = generateWrapper(passedProps)

            expect(wrapper.find(FinishedQuiz).exists()).toBe(true)
        })
    })

    it('componentWillUnmount test', () => {
        const retryQuiz = sinon.stub(defaultProps, 'retryQuiz')
        wrapper = shallow(<Quiz {...defaultProps} />).unmount()

        expect(retryQuiz.calledOnce).toBe(true)
    })

    it("mapStateToProps test", () => {
        const store = { quiz: { quiz: [{}] } }

        expect(mapStateToProps(store)).toEqual({ quiz: [{}] })
    })

    it('mapDispatchToProps test', () => {
        const fetchQuizById = jest.fn();
        const quizAnswerClick = jest.fn();
        const retryQuiz = jest.fn();

        mapDispatchToProps(fetchQuizById).fetchQuizById()
        mapDispatchToProps(quizAnswerClick).quizAnswerClick()
        mapDispatchToProps(retryQuiz).retryQuiz()

        expect(retryQuiz.mock.calls[0][0]).toEqual({ type: 'QUIZ_RETRY' })
    })

})