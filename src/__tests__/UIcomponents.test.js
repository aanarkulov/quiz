import React from 'react'
import { shallow } from 'enzyme'

import Backdrop from '../components/UI/Backdrop/Backdrop'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import Loader from '../components/UI/Loader/Loader'
import Select from '../components/UI/Select/Select'

describe('UI components', () => {

    let wrapper, props

    it('Backdrop', () => {
        wrapper = shallow(<Backdrop />)
        expect(wrapper)
    })

    it('Button', () => {
        wrapper = shallow(<Button />)
        expect(wrapper)
    })

    it('Button disabled true', () => {
        props = {
            disabled: true
        }
        wrapper = shallow(<Button {...props} />)
        expect(wrapper.find('button').prop('disabled')).toBe(true)
    })

    describe('Input', () => {
        it('Input', () => {
            wrapper = shallow(<Input />)
            expect(wrapper)
        })

        it('isInvalid test', () => {
            props = {
                valid: false,
                touched: true,
                shouldValidate: { required: true, email: true }
            }
            wrapper = shallow(<Input {...props} />)

            expect(wrapper.prop('className')).toEqual(' ')
        })
    })

    it('Loader', () => {
        wrapper = shallow(<Loader />)
        expect(wrapper)
    })

    it('Select', () => {
        props = {
            options: [{ text: 1, value: 1 }],
            onChange: jest.fn()
        }

        wrapper = shallow(<Select {...props} />)
        expect(wrapper)
    })

})

