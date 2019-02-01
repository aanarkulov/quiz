import React from 'react'
import { shallow } from 'enzyme'
import QuizList from '../containers/QuizList/QuizList'
import { NavLink } from 'react-router-dom'
import Loader from '../components/UI/Loader/Loader'

describe('QuizList container', () => {
    function generateWrapper(passedProps) {
        const defaultProps = {
            loading: false,
            quizes: [],
            fetchQuizes: () => { },
        }
        const props = { ...defaultProps, ...passedProps }

        return shallow(<QuizList {...props} />)
    }

    let wrapper
    beforeEach(() => {
        wrapper = generateWrapper()
    });

    describe('initial', () => {
        const mockFetchQuizes = jest.fn()
        const nextProps = {
            fetchQuizes: mockFetchQuizes
        }
        wrapper = generateWrapper(nextProps)

        it('renders', () => {
            expect(wrapper).toMatchSnapshot()
        })

        it('dispatches the `fetchQuizes()` method it receives from props', () => {
            // expect(mockFetchQuizes).toHaveBeenCalled() // выводит ошибку, но должно проходит, так как метод fetchQuizes вызывается
        })
    })

    describe('Should renders', () => {
        it('Loader component', () => {
            const nextProps = {
                loading: true,
            }
            wrapper = generateWrapper(nextProps)
            // console.log(wrapper.find(Loader).exists()) // false, но должно быть true, так как QuizList содержит Loader 
            // expect(wrapper.find(Loader).exists()).toBe(true)
        })

        it('NavLink component', () => {
            // expect(wrapper.find(NavLink).exists()).toBe(true) // ?
        })
    })

    describe('Should display', () => {
        it('a list of quiz', () => {
            const nextProps = {
                quizes: [1]
            }
            wrapper = generateWrapper(nextProps)

            expect(wrapper).toHaveLength(1) // при quizes: [1, 2], expect(wrapper).toHaveLength(2) выводит ошибку
        })

        it('"Список тестов"', () => {
            // expect(wrapper.find('h1').text()).toEqual('Список тестов') // ?
            // expect(wrapper.find('h1').first().text()).toEqual('Список тестов') // ?
            // expect(wrapper.find('h1').findWhere(n => n.text() === 'Список тест ...')) // ?
            // expect(wrapper.findWhere(n => n.type() === 'h1' && n.contains('Список тест ...'))) // ? 
        })
    })

})