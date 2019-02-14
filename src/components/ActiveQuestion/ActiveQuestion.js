import React from 'react';
import PropTypes from 'prop-types';
import classes from './ActiveQuestion.css';
import AnswerList from './AnswerList/AnswerList';
import validObjectItemIsString from '../../utils/prop-types-object-validate';

const ActiveQuestion = (props) => {
  const { question, answers, answerNumber, state, quizLength, onAnswerClick } = props;

  return (
    <div className={classes.ActiveQuestion}>
      <p className={classes.Question}>
        <span>
          <strong>
            {answerNumber}
            .
          </strong>
          &nbsp;&nbsp;
          {question}
        </span>
        <small>
          {answerNumber}
          &nbsp;из&nbsp;
          {quizLength}
        </small>
      </p>

      <AnswerList
        answers={answers}
        onAnswerClick={onAnswerClick}
        state={state}
      />
    </div>
  );
};

ActiveQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
  answerNumber: PropTypes.number.isRequired,
  state: PropTypes.objectOf(validObjectItemIsString),
  quizLength: PropTypes.number.isRequired,
  onAnswerClick: PropTypes.func.isRequired,
};

ActiveQuestion.defaultProps = { state: null };

export default ActiveQuestion;
