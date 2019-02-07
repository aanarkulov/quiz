import React from 'react'
import { shallow } from 'enzyme'

import { Auth, mapDispatchToProps } from '../containers/Auth/Auth'

describe('Auth container', () => {

    let wrapper
    it('should render form', () => {
        wrapper = shallow(<Auth />)
        expect(wrapper.find('form').exists()).toBe(true)
    })

    it('methods of Auth', () => {
        const props = { auth: jest.fn() }
        const event = { preventDefault: jest.fn() }
        wrapper = shallow(<Auth {...props} />)

        expect(wrapper.instance().loginHandler()).toBe(undefined)
        expect(wrapper.instance().registerHandler()).toBe(undefined)
        expect(wrapper.instance().submitHandler(event)).toBe(undefined)
        expect(wrapper.instance().onChangeHandler('a.anarkuloff@gmail.com', 'email')).toBe(undefined)
    })

    it('mapDispatchToProps test', () => {
        const auth = jest.fn();
        mapDispatchToProps(auth).auth()

        expect(typeof auth.mock.calls[0][0]).toEqual('function')
    })

    it('Input onChangeHandler test', () => {
        const onChangeHandler = jest.fn();

        wrapper.find('Input').first().simulate('change', {
            target: { value: '' }
        })

        expect(onChangeHandler.mock.calls).toEqual([])
    })

})