import React from 'react'
import { shallow } from 'enzyme'

import { Layout, mapStateToProps, } from '../hoc/Layout/Layout'

describe('Layout test', () => {

    let wrapper, props
    beforeEach(() => {
        props = {
            isAuthenticated: null,
        }
        wrapper = shallow(<Layout {...props} />)
    })

    it('should render Drawer', () => {
        expect(wrapper.find('Drawer').exists()).toBe(true)
    })

    it('toggleMenuHandler, menuCloseHandler test', () => {
        expect(wrapper.instance().toggleMenuHandler()).toBe(undefined)
        expect(wrapper.instance().menuCloseHandler()).toBe(undefined)
    })

    it("mapStateToProps test", () => {
        const store = { auth: { token: 'token' } }

        expect(mapStateToProps(store)).toEqual({ isAuthenticated: true })
    })

})