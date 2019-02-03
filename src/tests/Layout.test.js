import React from 'react'
import { shallow } from 'enzyme'
import Layout from '../hoc/Layout/Layout'
import Drawer from '../components/Navigation/Drawer/Drawer'
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle'

describe('Layout hoc', () => {

    it('should render Drawer, MenuToggle component', () => {
        const props = {
            isAuthenticated: null
        }
        const wrapper = shallow(<Layout {...props} />)

        expect(wrapper.find(Drawer).exists()).toBe(true)
        expect(wrapper.find(MenuToggle).exists()).toBe(true)
    })

})