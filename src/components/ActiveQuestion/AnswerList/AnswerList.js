import React from 'react';
import PropTypes from 'prop-types';
import classes from './AnswerList.css';
import AnswerItem from './AnswerItem/AnswerItem';
import validObjectItemIsString from '../../../utils/prop-types-object-validate';

const AnswerList = (props) => {
  const { answers, state, onAnswerClick } = props;
  return (
    <ul className={classes.AnswersList}>
      {answers.map(answer => (
        <AnswerItem
          key={answer.id}
          answer={answer}
          onAnswerClick={onAnswerClick}
          state={state ? state[answer.id] : null}
        />
      ))}
    </ul>
  );
};

AnswerList.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
  state: PropTypes.objectOf(validObjectItemIsString),
  onAnswerClick: PropTypes.func.isRequired,
};

AnswerList.defaultProps = { state: null };

export default AnswerList;
