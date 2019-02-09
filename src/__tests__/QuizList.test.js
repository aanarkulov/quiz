import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { QuizList, mapStateToProps, mapDispatchToProps } from '../containers/QuizList/QuizList'

describe('QuizList container', () => {
    let wrapper, props
    it('should render Loader', () => {
        props = {
            loading: true,
            quizes: [],
            fetchQuizes: jest.fn()
        }
        wrapper = shallow(<QuizList {...props} />)

        expect(wrapper.find('Loader').exists()).toBe(true)
    })

    it('should render NavLink', () => {
        props = {
            loading: false,
            quizes: [
                { id: 1, name: 'Quiz 1' }
            ],
            fetchQuizes: jest.fn()
        }
        wrapper = shallow(<QuizList {...props} />)

        expect(wrapper.find('NavLink').exists()).toBe(true)
    })

    it('componentDidMount test', () => {
        const fetchQuizes = sinon.stub(props, 'fetchQuizes')
        wrapper = shallow(<QuizList {...props} />)

        expect(fetchQuizes.calledOnce).toBe(true)
    })

    it("mapStateToProps test", () => {
        const store = { quiz: { quizes: [{}] } }

        expect(mapStateToProps(store)).toEqual({ quizes: [{}] })
    })

    it('mapDispatchToProps test', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).fetchQuizes();

        expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
    })

})