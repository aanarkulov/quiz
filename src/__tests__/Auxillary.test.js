import React from 'react'
import { shallow } from 'enzyme'
import Auxillary from '../hoc/Auxillary/Auxillary'

describe('Auxillary', () => {
    it('should render children', () => {
        const wrapper = shallow(<Auxillary />)
        expect(wrapper)
    })
})