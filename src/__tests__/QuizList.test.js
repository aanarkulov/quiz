import React from 'react';
import { shallow } from 'enzyme';
import { QuizList, mapStateToProps, mapDispatchToProps } from '../containers/QuizList/QuizList';
import * as types from '../store/actions/actionTypes';

describe('QuizList container', () => {
  let wrapper;
  let props;
  it('should render Loader', () => {
    props = {
      loading: true,
      quizes: [],
      fetchQuizes: jest.fn(),
    };
    wrapper = shallow(<QuizList {...props} />);
    expect(wrapper.find('Loader').exists()).toBe(true);
  });

  it('should render NavLink', () => {
    props = {
      loading: false,
      quizes: [{ id: 1, name: 'Quiz 1' }],
      fetchQuizes: jest.fn(),
    };
    wrapper = shallow(<QuizList {...props} />);
    expect(wrapper.find('NavLink').exists()).toBe(true);
  });

  it('mapStateToProps test', () => {
    const quizReducer = {
      loading: false,
      quizes: [{}],
    };
    const store = { quiz: quizReducer };
    expect(mapStateToProps(store)).toEqual(quizReducer);
  });

  it('mapDispatchToProps test', () => {
    const fetchQuizes = jest.fn();
    mapDispatchToProps(fetchQuizes).fetchQuizes();
    expect(fetchQuizes.mock.calls[0][0]).toEqual({ type: types.FETCH_QUIZES });
  });
});
