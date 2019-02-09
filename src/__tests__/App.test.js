import React from 'react'
import { shallow } from 'enzyme'

import { App, mapStateToProps, mapDispatchToProps } from '../App'
import Logout from '../components/Logout/Logout'

describe('App test', () => {

    let wrapper, props
    it('should render Switch', () => {
        props = {
            isAuthenticated: null,
            autoLogin: jest.fn()
        }
        wrapper = shallow(<App {...props} />)

        expect(wrapper.find('Switch').exists()).toBe(true)
    })

    it('should render if isAuthenticated true', () => {
        props = {
            isAuthenticated: true,
            autoLogin: jest.fn()
        }
        wrapper = shallow(<App {...props} />)

        expect(wrapper.find('Route[path="/logout"]').prop('component')).toBe(Logout)
    })

    it("mapStateToProps test", () => {
        const store = { auth: { token: 'token' } }

        expect(mapStateToProps(store)).toEqual({ isAuthenticated: true })
    })

    it('mapDispatchToProps test', () => {
        const autoLogin = jest.fn();
        mapDispatchToProps(autoLogin).autoLogin();

        expect(typeof autoLogin.mock.calls[0][0]).toEqual('function');
    })

})