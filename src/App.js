import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Logout from './components/Logout/Logout';
import * as actions from './store/actions/auth';

export class App extends Component {
  componentDidMount() {
    const { autoLogin } = this.props;
    autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  autoLogin: PropTypes.func.isRequired,
};

App.defaultProps = { isAuthenticated: null };

export function mapStateToProps(state) {
  return { isAuthenticated: state.auth.token && true };
}

export function mapDispatchToProps(dispatch) {
  return { autoLogin: () => dispatch(actions.autoLogin()) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
