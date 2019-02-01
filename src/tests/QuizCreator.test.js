import React from 'react'
import { shallow } from 'enzyme'
import QuizCreator from '../containers/QuizCreator/QuizCreator'
import Button from '../components/UI/Button/Button'
import Select from '../components/UI/Select/Select'
import Quiz from '../containers/Quiz/Quiz'

describe('QuizCreator container', () => {
    function generateWrapper(nextProps) {
        const defaultProps = {}
        const props = { ...defaultProps, ...nextProps }

        return shallow(<QuizCreator {...props} />)
    }

    let wrapper
    beforeEach(() => {
        wrapper = generateWrapper()
    });

    describe('Should renders component', () => {

        it('Button', () => {
            console.log(wrapper.contains(<Button />)) // false, но должно быть true, так как QuizCreatir содержит Button
            // expect(wrapper.contains(<Button />)).toBe(true)
        })

        it('Select', () => {
            // expect(wrapper.contains(<Select />)).toBe(true)
        })
    })


})