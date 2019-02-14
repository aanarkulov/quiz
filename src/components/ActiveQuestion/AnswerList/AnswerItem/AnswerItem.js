import React from 'react';
import PropTypes from 'prop-types';
import classes from './AnswerItem.css';

const AnswerItem = (props) => {
  const cls = [classes.AnswerItem];
  const { answer, state, onAnswerClick } = props;

  if (state) {
    cls.push(classes[state]);
  }

  return (
    <li className={cls.join(' ')}>
      <div
        role="button"
        tabIndex="0"
        onClick={() => onAnswerClick(answer.id)}
        onKeyPress={() => { }}
      >
        {answer.text}
      </div>
    </li>
  );
};

AnswerItem.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  state: PropTypes.string,
  onAnswerClick: PropTypes.func.isRequired,
};

AnswerItem.defaultProps = { state: null };

export default AnswerItem;
