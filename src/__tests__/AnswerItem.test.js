import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import AnswerItem from '../components/ActiveQuestion/AnswerList/AnswerItem/AnswerItem'

describe('AnswerItem component', () => {

    let wrapper, props
    it('onAnswerClick test', () => {
        props = {
            answer: { id: 1, text: '' },
            state: 'success',
            onAnswerClick: jest.fn()
        }

        const onAnswerClick = sinon.stub(props, 'onAnswerClick')
        wrapper = shallow(<AnswerItem {...props} />)
        wrapper.find('li').simulate('click')
        expect(onAnswerClick.calledOnce).toBe(true)
    })

    it('li className test', () => {
        expect(wrapper.find('li').className).toBe(undefined)
    })
})