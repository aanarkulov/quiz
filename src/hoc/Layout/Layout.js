import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

export class Layout extends Component {
  state = { menu: false };

  toggleMenuHandler = () => {
    const { menu } = this.state;
    this.setState({ menu: !menu });
  }

  menuCloseHandler = () => this.setState({ menu: false });

  render() {
    const { menu } = this.state;
    const { children, isAuthenticated } = this.props;

    return (
      <div className={classes.Layout}>
        <Drawer isOpen={menu} onClose={this.menuCloseHandler} isAuthenticated={isAuthenticated} />
        <MenuToggle onToggle={this.toggleMenuHandler} isOpen={menu} />
        <main>
          {children}
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  isAuthenticated: PropTypes.bool,
};

Layout.defaultProps = { isAuthenticated: null };

export const mapStateToProps = state => ({ isAuthenticated: state.auth.token && true });

export default connect(mapStateToProps)(Layout);
