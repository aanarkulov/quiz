import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/auth';

export class Logout extends Component {
  componentDidMount() {
    const { logout } = this.props;
    logout();
  }

  render = () => <Redirect to="/" />;
}

Logout.propTypes = { logout: PropTypes.func.isRequired };

export function mapDispatchToProps(dispatch) {
  return { logout: () => dispatch(actions.logout()) };
}

export default connect(null, mapDispatchToProps)(Logout);
