import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.css';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = (props) => {
  const { type, label, value, errorMessage, onChange } = props;
  const cls = [classes.Input];
  const htmlFor = `${type}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <input
        type={type}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
      {isInvalid(props) ? <span>{errorMessage}</span> : null}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
  errorMessage: 'Введите верное значение',
};

export default Input;
