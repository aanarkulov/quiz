import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Quiz from '../containers/Quiz/Quiz'
import Loader from '../components/UI/Loader/Loader'
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz'
import ActiveQuestion from '../components/ActiveQuestion/ActiveQuestion'

describe('Quiz container', () => {
    let wrapper, defaultProps
    function generateWrapper(passedProps) {
        defaultProps = {
            loading: false,
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            quiz: null,
            fetchQuizById: (quizId) => { },
            quizAnswerClick: () => { },
            retryQuiz: () => { }
        }

        const props = { ...defaultProps, ...passedProps }

        return shallow(<Quiz {...props} />)
    }

    it('should render Loader component', () => {
        const passedProps = {
            loading: true,
        }
        wrapper = generateWrapper(passedProps)

        expect(wrapper.find(Loader).exists()).toBe(true)
    })

    it('should render ActiveQuestion component', () => {
        const passedProps = {
            loading: false,
            quiz: [1]
        }
        wrapper = generateWrapper(passedProps)

        expect(wrapper.find(ActiveQuestion).exists()).toBe(true)
    })

    it('should render FinishedQuiz component', () => {
        const passedProps = {
            isFinished: true,
            quiz: [1]
        }
        wrapper = generateWrapper(passedProps)

        expect(wrapper.find(FinishedQuiz).exists()).toBe(true)
    })

    it('componentDidMount', () => {
        const fetchQuizById = sinon.stub(defaultProps, 'fetchQuizById')
        wrapper = shallow(<Quiz {...defaultProps} />)

        expect(fetchQuizById.calledOnce).toBe(true)
    })

    it('componentWillUnmount', () => {
        const retryQuiz = sinon.stub(defaultProps, 'retryQuiz')
        wrapper = shallow(<Quiz {...defaultProps} />).unmount()

        expect(retryQuiz.calledOnce).toBe(true)
    })

})
