import React from 'react'
import { shallow } from 'enzyme'
import { Logout, mapDispatchToProps } from '../components/Logout/Logout'

describe('Logout component', () => {

    it('should render Redirect', () => {
        const props = {
            logout: jest.fn()
        }
        const wrapper = shallow(<Logout {...props} />)

        expect(wrapper.find('Redirect').exists()).toBe(true)
    })

    it('mapDispatchToProps test', () => {
        const logout = jest.fn();
        mapDispatchToProps(logout).logout()

        expect(logout.mock.calls[0][0]).toEqual({ type: 'AUTH_LOGOUT' })
    })

})