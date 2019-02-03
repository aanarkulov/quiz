import React from 'react'
import { shallow } from 'enzyme'
import Auth from '../containers/Auth/Auth'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'

describe('Auth container', () => {

    let wrapper
    beforeEach(() => {
        const props = {
            Auth: jest.fn()
        }
        wrapper = shallow(<Auth {...props} />)
    })

    it('should render Input components', () => {
        expect(wrapper.find(Input)).toHaveLength(2)
        expect(wrapper.find(Input).first().props().type).toEqual('email')
        expect(wrapper.find(Input).get(1).props.type).toEqual('password')
    })

    it('should render Button components', () => {
        expect(wrapper.find(Button)).toHaveLength(2)

        expect(wrapper.find(Button).get(0).props.type).toBe('success')
        expect(wrapper.find(Button).get(0).props.children).toBe('Войти')

        expect(wrapper.find(Button).get(1).props.type).toBe('primary')
        expect(wrapper.find(Button).get(1).props.children).toBe('Зарегистрироваться')
    })

})