import React from 'react'
import { shallow } from 'enzyme'
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz'

describe('FinishedQuiz component', () => {

    it('should render Button and li element', () => {
        const props = {
            results: { 1: 'success' },
            quiz: [{ id: 1, question: 'question' }],
            onRetry: jest.fn()
        }
        const wrapper = shallow(<FinishedQuiz {...props} />)

        expect(wrapper.find('Button').exists()).toBe(true)
        expect(wrapper.find('li').exists()).toBe(true)
    })

    it('if results[1] = "error" return li[className="fa fa-times ..."]', () => {
        const props = {
            results: { 1: 'error' },
            quiz: [{ id: 1, question: 'question' }],
            onRetry: jest.fn()
        }
        const wrapper = shallow(<FinishedQuiz {...props} />)

        expect(wrapper.find('li').exists()).toBe(true)
    })

})