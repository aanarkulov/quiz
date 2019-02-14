import React from 'react';
import PropTypes from 'prop-types';
import classes from './MenuToggle.css';

const MenuToggle = (props) => {
  const { isOpen, onToggle } = props;
  const cls = [
    classes.MenuToggle,
    'fa',
  ];

  if (isOpen) {
    cls.push('fa-times');
    cls.push(classes.open);
  } else {
    cls.push('fa-bars');
  }

  return (
    <i
      role="presentation"
      className={cls.join(' ')}
      onClick={onToggle}
    />
  );
};

MenuToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default MenuToggle;
