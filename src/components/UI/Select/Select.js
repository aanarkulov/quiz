import React from 'react';
import PropTypes from 'prop-types';
import classes from './Select.css';

const Select = (props) => {
  const { label, value, options, onChange } = props;
  const htmlFor = `${label}-${Math.random()}`;

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select id={htmlFor} value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
