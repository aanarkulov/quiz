import React from 'react'
import { shallow } from 'enzyme'
import Drawer from '../components/Navigation/Drawer/Drawer'

describe('Drawer component', () => {

    let wrapper, props

    it('should render Redirect', () => {
        wrapper = shallow(<Drawer />)

        expect(wrapper).toHaveLength(1)
    })

    it('should render NavLink[to="/logout"]', () => {
        props = {
            isAuthenticated: true
        }
        wrapper = shallow(<Drawer {...props} />)

        expect(wrapper.find('NavLink[to="/logout"]').exists()).toBe(true)
    })

    it('should render Backdrop', () => {
        props = {
            isOpen: true
        }
        wrapper = shallow(<Drawer {...props} />)

        expect(wrapper.find('Backdrop').exists()).toBe(true)
    })

    it('onClose test', () => {
        props = {
            onClose: jest.fn()
        }
        wrapper = shallow(<Drawer {...props} />)

        expect(wrapper.instance().clickHandler()).toBe(undefined)
    })

})