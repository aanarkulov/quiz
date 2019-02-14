import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.css';

const Backdrop = (props) => {
  const { onClick } = props;
  return (
    <div role="presentation" className={classes.Backdrop} onClick={onClick} />
  );
};

Backdrop.propTypes = { onClick: PropTypes.func.isRequired };

export default Backdrop;
