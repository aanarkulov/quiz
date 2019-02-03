import React from 'react'
import { shallow } from 'enzyme'
import { Route, Switch, Redirect } from 'react-router-dom'
import sinon from 'sinon'
import App from '../App'
import QuizList from '../containers/QuizList/QuizList'
import Auth from '../containers/Auth/Auth'
import Quiz from '../containers/Quiz/Quiz'
import QuizCreator from '../containers/QuizCreator/QuizCreator'
import Logout from '../components/Logout/Logout'

describe('App test', () => {

    let props = {
        isAuthenticated: null,
        autoLogin: jest.fn()
    }
    let wrapper = shallow(<App {...props} />)

    it('should render Switch Redirect', () => {
        expect(wrapper.find(Switch).exists()).toBe(true)
        expect(wrapper.find(Redirect).props().to).toEqual('/')
    })

    it('should render Route components if isAuthenticated false', () => {
        expect(wrapper.find(Route)).toHaveLength(3)
        expect(wrapper.find('Route[path="/auth"]').prop('component')).toBe(Auth)
        expect(wrapper.find('Route[path="/quiz/:id"]').prop('component')).toBe(Quiz)
        expect(wrapper.find('Route[exact=true][path="/"]').prop('component')).toBe(QuizList)
    })

    it('should render Route components if isAuthenticated true', () => {
        props = {
            isAuthenticated: true,
            autoLogin: jest.fn()
        }
        wrapper = shallow(<App {...props} />)

        expect(wrapper.find(Route)).toHaveLength(4)
        expect(wrapper.find('Route[path="/quiz-creator"]').prop('component')).toBe(QuizCreator)
        expect(wrapper.find('Route[path="/quiz/:id"]').prop('component')).toBe(Quiz)
        expect(wrapper.find('Route[exact=true][path="/"]').prop('component')).toBe(QuizList)
        expect(wrapper.find('Route[path="/logout"]').prop('component')).toBe(Logout)
    })

    it('ComponentDidMount', () => {
        const autoLogin = sinon.stub(props, 'autoLogin')
        wrapper = shallow(<App {...props} />)

        expect(autoLogin.calledOnce).toBe(true)
    })

})