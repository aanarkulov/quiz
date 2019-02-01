import React from 'react'
import { shallow } from 'enzyme'
import Quiz from '../containers/Quiz/Quiz'
import ActiveQuestion from '../components/ActiveQuestion/ActiveQuestion'
import Loader from '../components/UI/Loader/Loader'
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz'

describe('Quiz container', () => {
    function generateWrapper(nextProps) {
        const defaultProps = {
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            quiz: null,
            loading: false
        }
        const props = { ...defaultProps, ...nextProps }

        return shallow(<Quiz {...props} />)
    }

    let wrapper
    beforeEach(() => {
        wrapper = generateWrapper()
    });

    describe('Should renders component', () => {
        it('Loader if quiz is loading', () => {
            const nextProps = {
                loading: true
            }
            wrapper = generateWrapper(nextProps)

            // expect(wrapper.find(Loader).exists()).toBe(true) // См src/tests/Quiz.test.js :29
        })

        it('ActiveQuestion if quiz is active', () => {
            const nextProps = {
                quiz: [{
                    id: 1,
                    question: 'Сколько тебе лет?',
                    rightAnswerId: 1,
                    answers: [
                        { id: 1, text: "23" },
                        { id: 2, text: "11" },
                        { id: 3, text: "52" },
                        { id: 4, text: "18" }
                    ]
                }]
            }
            wrapper = generateWrapper(nextProps)

            // expect(wrapper.find(ActiveQuestion).exists()).toBe(true)
        })

        it('FinishedQuiz if quiz is finished', () => {
            const nextProps = {
                isFinished: true
            }
            wrapper = generateWrapper(nextProps)

            // expect(wrapper.find(FinishedQuiz).exists()).toBe(true)
        })

    })

})