import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import QuizList from '../containers/QuizList/QuizList'
import { NavLink } from 'react-router-dom'
import Loader from '../components/UI/Loader/Loader'

describe('QuizList container', () => {
    let wrapper, defaultProps
    function generateWrapper(passedProps) {
        defaultProps = {
            loading: false,
            quizes: [],
            fetchQuizes: () => { },
        }
        const props = { ...defaultProps, ...passedProps }

        return shallow(<QuizList {...props} />)
    }

    it('should render Loader', () => {
        const passedProps = {
            loading: true
        }
        wrapper = generateWrapper(passedProps)

        expect(wrapper.find(Loader).exists()).toBe(true)
    })

    it('should render NavLink', () => {
        const passedProps = {
            quizes: [{ id: 1, name: 'Тест № 1' }],
        }
        wrapper = generateWrapper(passedProps)

        expect(wrapper.find(NavLink)).toHaveLength(1)
    })

    it('ComponentDidMount', () => {
        const fetchQuizes = sinon.stub(defaultProps, 'fetchQuizes')
        wrapper = generateWrapper()

        // wrapper.instance().componentDidMount()
        expect(fetchQuizes.calledOnce).toBe(true)
    })

})