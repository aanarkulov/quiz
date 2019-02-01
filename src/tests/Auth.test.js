import React from 'react'
import { shallow } from 'enzyme'
import Auth from '../containers/Auth/Auth'
import { createControl } from '../form/formFramework'

import Button from '../components/UI/Button/Button'

describe('Auth container', () => {
    const initialState = {
        isFormValid: false,
        formControls: {
            email: createControl({
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
            }, { required: true, email: true }),

            password: createControl({
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
            }, { required: true, minLength: 6 }),
        }
    }

    function generateWrapper(nextProps) {
        const defaultProps = {}
        const props = { ...defaultProps, ...nextProps }

        return shallow(<Auth {...props} />)
    }

    let wrapper
    beforeEach(() => {
        wrapper = generateWrapper()
    });

    describe('Should renders component', () => {
        it('Button', () => {
            // expect(wrapper.contains(<Button />)).toBe(true) // См src/tests/QuizCreator.test.js :24
        })
    })

})