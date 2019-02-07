import React from 'react'
import { shallow } from 'enzyme'
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle'

describe('MenuToggle component', () => {

    let wrapper
    it('if isOpen false: li[className=" fa fa-bars"]', () => {
        wrapper = shallow(<MenuToggle />)

        expect(wrapper.prop('className')).toEqual(' fa fa-bars')
    })

    it('if isOpen true: li[className=" fa fa-times "]', () => {
        const props = {
            isOpen: true
        }
        wrapper = shallow(<MenuToggle {...props} />)

        expect(wrapper.prop('className')).toEqual(' fa fa-times ')
    })

})