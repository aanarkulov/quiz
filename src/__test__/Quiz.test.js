import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Quiz, mapStateToProps, mapDispatchToProps } from '../containers/Quiz/Quiz'
import Loader from '../components/UI/Loader/Loader'
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
        it('Loader', () => {
            const passedProps = {
                loading: true,
            }
            wrapper = generateWrapper(passedProps)
            expect(wrapper.find(Loader).exists()).toBe(true)
        })

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

    it('componentDidMount test', () => {
        const fetchQuizById = sinon.stub(defaultProps, 'fetchQuizById')
        wrapper = shallow(<Quiz {...defaultProps} />)

        expect(fetchQuizById.calledOnce).toBe(true)
    })

    it('componentWillUnmount test', () => {
        const retryQuiz = sinon.stub(defaultProps, 'retryQuiz')
        wrapper = shallow(<Quiz {...defaultProps} />).unmount()

        expect(retryQuiz.calledOnce).toBe(true)
    })

    it("mapStateToProps test", () => {
        const store = {
            quiz: {
                quiz: [
                    {
                        id: 1,
                        question: 'Сколько тебе лет?',
                        rightAnswerId: 1,
                        answers: [
                            { id: 1, text: "23" },
                            { id: 2, text: "11" },
                            { id: 3, text: "52" },
                            { id: 4, text: "18" }
                        ]
                    }
                ],
                results: {},
                isFinished: false,
                activeQuestion: 0,
                answerState: null,
                loading: false
            }
        }

        expect(mapStateToProps(store)).toEqual({
            quiz: [
                {
                    id: 1,
                    question: 'Сколько тебе лет?',
                    rightAnswerId: 1,
                    answers: [
                        { id: 1, text: "23" },
                        { id: 2, text: "11" },
                        { id: 3, text: "52" },
                        { id: 4, text: "18" }
                    ]
                }
            ],
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            loading: false
        })
    })

    it('mapDispatchToProps test', () => {
        const fetchQuizById = jest.fn();
        const quizAnswerClick = jest.fn();
        const retryQuiz = jest.fn();

        mapDispatchToProps(fetchQuizById).fetchQuizById()
        mapDispatchToProps(quizAnswerClick).quizAnswerClick()
        mapDispatchToProps(retryQuiz).retryQuiz()

        expect(typeof fetchQuizById.mock.calls[0][0]).toEqual('function')
        expect(typeof quizAnswerClick.mock.calls[0][0]).toEqual('function')
        expect(retryQuiz.mock.calls[0][0]).toEqual({ type: 'QUIZ_RETRY' })
    })

})