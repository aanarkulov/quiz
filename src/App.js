import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import { Route, Switch } from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'
import QuizCrator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={QuizList} />
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCrator} />
          <Route path="/quiz/:id" component={Quiz} />
        </Switch>
      </Layout>
    )
  }
}

export default App
