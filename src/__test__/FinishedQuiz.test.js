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

})