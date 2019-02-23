import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import QuizList from './containers/QuizList/QuizList';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Logout from './components/Logout/Logout';
import { AUTO_LOGIN } from './store/actions/actionTypes';

export class App extends PureComponent {
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
          <Route path="/logout" component={Logout} />
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  autoLogin: PropTypes.func.isRequired,
};

App.defaultProps = { isAuthenticated: null };

export const mapStateToProps = state => ({ isAuthenticated: state.auth.token && true });

export const mapDispatchToProps = dispatch => ({ autoLogin: () => dispatch({ type: AUTO_LOGIN }) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
