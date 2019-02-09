import React from 'react'
import { shallow } from 'enzyme'
import AnswerList from '../components/ActiveQuestion/AnswerList/AnswerList'

describe('AnswerList component', () => {

    it('should render', () => {
        const props = {
            answers: [{ id: 1, text: '' }],
            state: { 1: 'success' }
        }
        const wrapper = shallow(<AnswerList {...props} />)

        expect(wrapper.find('AnswerItem').exists()).toBe(true)
        expect(wrapper.find('AnswerItem').prop('state')).toEqual('success')
    })

    it('props state: null', () => {
        const props = {
            answers: [{ id: 1, text: '' }],
            state: null
        }
        const wrapper = shallow(<AnswerList {...props} />)

        expect(wrapper.find('AnswerItem').prop('state')).toBe(null)
    })

})