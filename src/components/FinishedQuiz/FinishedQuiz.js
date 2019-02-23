import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './FinishedQuiz.css';
import Button from '../UI/Button/Button';
import validObjectItemIsString from '../../utils/prop-types-object-validate';

const FinishedQuiz = (props) => {
  const { quiz, results, onRetry } = props;

  let total = 0;
  Object.keys(results).map((key) => {
    if (results[key] === 'success') {
      total++;
    }
    return total;
  });

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]],
          ];

          return (
            <li key={quizItem.id}>
              {`${index + 1}. ${quizItem.question}`}
              <i className={cls.join(' ')} />
            </li>
          );
        })}
      </ul>
      <p>{`Правильно ${total} из ${quiz.length}`}</p>
      <div>
        <Button onClick={onRetry} type="primary">Повторить</Button>
        <Link to="/"><Button type="success">Перейти в список тестов</Button></Link>
      </div>
    </div>
  );
};

FinishedQuiz.propTypes = {
  quiz: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    rightAnswerId: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    })),
  })).isRequired,
  results: PropTypes.objectOf(validObjectItemIsString).isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FinishedQuiz;
