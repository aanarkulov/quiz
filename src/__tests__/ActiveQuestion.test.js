import React from 'react'
import { shallow } from 'enzyme'
import ActiveQuestion from '../components/ActiveQuestion/ActiveQuestion'

describe('ActiveQuestion component', () => {

    it('should render', () => {
        const wrapper = shallow(<ActiveQuestion />)
        expect(wrapper.find('AnswerList').exists()).toBe(true)
    })

})