import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './Quiz.css';
import ActiveQuestion from '../../components/ActiveQuestion/ActiveQuestion';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import validObjectItemIsString from '../../utils/prop-types-object-validate';
import * as types from '../../store/actions/actionTypes';

export class Quiz extends Component {
  componentDidMount() {
    const { fetchQuizById, match } = this.props;
    fetchQuizById(match.params.id);
  }

  componentWillUnmount() {
    const { retryQuiz } = this.props;
    retryQuiz();
  }

  render() {
    const { loading, quiz, isFinished, results, activeQuestion, answerState } = this.props;
    const { retryQuiz, quizAnswerClick } = this.props;

    let render;
    if (loading || !quiz) {
      render = (<Loader />);
    } else {
      let activeOrFinish;
      if (isFinished) {
        activeOrFinish = <FinishedQuiz results={results} quiz={quiz} onRetry={retryQuiz} />;
      } else {
        activeOrFinish = (
          <ActiveQuestion
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={quizAnswerClick}
            quizLength={quiz.length}
            answerNumber={activeQuestion + 1}
            state={answerState}
          />
        );
      }
      render = activeOrFinish;
    }

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {render}
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  results: PropTypes.objectOf(validObjectItemIsString),
  isFinished: PropTypes.bool.isRequired,
  activeQuestion: PropTypes.number.isRequired,
  answerState: PropTypes.objectOf(validObjectItemIsString),
  loading: PropTypes.bool.isRequired,
  quiz: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    rightAnswerId: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    })),
  })),
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({ id: PropTypes.string }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  fetchQuizById: PropTypes.func.isRequired,
  quizAnswerClick: PropTypes.func.isRequired,
  retryQuiz: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  results: {},
  answerState: null,
  quiz: null,
};

export const mapStateToProps = state => ({
  loading: state.quiz.loading,
  quiz: state.quiz.quiz,
  results: state.quiz.results,
  isFinished: state.quiz.isFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
});

export const mapDispatchToProps = dispatch => ({
  fetchQuizById: quizId => dispatch({ type: types.FETCH_QUIZ_BY_ID, quizId }),
  quizAnswerClick: answerId => dispatch({ type: types.QUIZ_ANSWER_CLICK, answerId }),
  retryQuiz: () => dispatch({ type: types.QUIZ_RETRY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
