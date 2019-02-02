import React from 'react'
import { shallow } from 'enzyme'
import QuizCreator from '../containers/QuizCreator/QuizCreator'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'
import Select from '../components/UI/Select/Select'

describe('QuizCreator container', () => {

    let wrapper
    beforeEach(() => {
        const props = {
            quiz: [],
            createQuizQuestion: jest.fn(),
            finishCreateQuiz: jest.fn()
        }
        wrapper = shallow(<QuizCreator {...props} />)
    })

    it('should render Input components', () => {
        expect(wrapper.find(Input)).toHaveLength(5)
        expect(wrapper.find(Input).first().props().label).toEqual('Введите вопрос')
        expect(wrapper.find(Input).get(1).props.label).toEqual('Вариант 1')
        expect(wrapper.find(Input).get(2).props.label).toEqual('Вариант 2')
        expect(wrapper.find(Input).get(3).props.label).toEqual('Вариант 3')
        expect(wrapper.find(Input).get(4).props.label).toEqual('Вариант 4')
    })

    it('should render Select components', () => {
        expect(wrapper.find(Select).exists()).toBe(true)
        expect(wrapper.find(Select).props().label).toEqual('Выберите правильный ответ')
        expect(wrapper.find(Select).props().options).toHaveLength(4)
        expect(wrapper.find(Select).props().value).toBe(1)
    })

    it('should render Button components', () => {
        expect(wrapper.find(Button)).toHaveLength(2)
        expect(wrapper.find(Button).get(0).props.type).toBe('primary')
        expect(wrapper.find(Button).get(1).props.type).toBe('success')
    })

})