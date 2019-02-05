import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { QuizList, mapStateToProps, mapDispatchToProps } from '../containers/QuizList/QuizList'
import Loader from '../components/UI/Loader/Loader'
import { NavLink } from 'react-router-dom'

describe('QuizList container', () => {
    let wrapper, props
    it('should render Loader', () => {
        props = {
            loading: true,
            quizes: [],
            fetchQuizes: jest.fn()
        }
        wrapper = shallow(<QuizList {...props} />)

        expect(wrapper.find(Loader).exists()).toBe(true)
    })

    it('should render NavLink', () => {
        props = {
            loading: false,
            quizes: [1],
            fetchQuizes: jest.fn()
        }
        wrapper = shallow(<QuizList {...props} />)

        expect(wrapper.find(NavLink).exists()).toBe(true)
    })

    it('componentDidMount test', () => {
        const fetchQuizes = sinon.stub(props, 'fetchQuizes')
        wrapper = shallow(<QuizList {...props} />)

        expect(fetchQuizes.calledOnce).toBe(true)
    })

    it("mapStateToProps test", () => {
        const store = {
            quiz: {
                quizes: [
                    { id: 1, name: "Test 1" },
                    { id: 2, name: "Test 2" },
                ],
                loading: false
            },
        }

        expect(mapStateToProps(store)).toEqual({
            quizes: [
                { id: 1, name: 'Test 1' },
                { id: 2, name: 'Test 2' }
            ],
            loading: false
        })
    })

    it('mapDispatchToProps test', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).fetchQuizes();

        expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
    })

})