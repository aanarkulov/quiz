import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const Button = (props) => {
  const { type, disabled, children, onClick } = props;
  const cls = [
    classes.Button,
    classes[type],
    disabled ? classes.disabled : null,
  ];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cls.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  onClick: null,
};

export default Button;
