import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './QuizList.css';
import Loader from '../../components/UI/Loader/Loader';
import { FETCH_QUIZES } from '../../store/actions/actionTypes';

export class QuizList extends Component {
  componentDidMount() {
    const { fetchQuizes } = this.props;
    fetchQuizes();
  }

  render() {
    const { quizes, loading } = this.props;
    const render = quizes.map(quiz => (
      <li key={quiz.id}><NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink></li>
    ));

    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {loading && quizes.length === 0 ? <Loader /> : (<ul>{render}</ul>)}
        </div>
      </div>
    );
  }
}

QuizList.propTypes = {
  quizes: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchQuizes: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  quizes: state.quiz.quizes,
  loading: state.quiz.loading,
});

export const mapDispatchToProps = dispatch => (
  { fetchQuizes: () => dispatch({ type: FETCH_QUIZES }) }
);

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
