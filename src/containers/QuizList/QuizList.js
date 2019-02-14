import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './QuizList.css';
import Loader from '../../components/UI/Loader/Loader';
import * as actions from '../../store/actions/quiz';


export class QuizList extends Component {
  componentDidMount() {
    const { fetchQuizes } = this.props;
    fetchQuizes();
  }

  renderQuiz() {
    const { quizes } = this.props;
    return quizes.map(quiz => (
      <li key={quiz.id}>
        <NavLink to={`/quiz/${quiz.id}`}>
          {quiz.name}
        </NavLink>
      </li>
    ));
  }

  render() {
    const { quizes, loading } = this.props;

    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {loading && quizes.length === 0 ? <Loader /> : (<ul>{this.renderQuiz()}</ul>)}
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

export function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
}

export function mapDispatchToProps(dispatch) {
  return { fetchQuizes: () => dispatch(actions.fetchQuizes()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
