import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

class Drawer extends Component {
  clickHandler = () => {
    const { onClose } = this.props;
    onClose();
  }

  renderLinks(links) {
    return links.map(link => (
      <li key={link.label}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={this.clickHandler}
        >
          {link.label}
        </NavLink>
      </li>
    ));
  }

  render() {
    const { isOpen, isAuthenticated, onClose } = this.props;
    const cls = [classes.Drawer];

    if (!isOpen) {
      cls.push(classes.close);
    }

    const links = [{ to: '/', label: 'Список', exact: true }];

    if (isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false });
      links.push({ to: '/logout', label: 'Выйти', exact: false });
    } else {
      links.push({ to: '/auth', label: 'Авторизация', exact: false });
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {isOpen && <Backdrop onClick={onClose} />}
      </React.Fragment>
    );
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

Drawer.defaultProps = { isAuthenticated: null };

export default Drawer;
