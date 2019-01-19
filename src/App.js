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
          <Route path="/auth" Component={Auth} />
          <Route path="/quiz-creator" Component={QuizCrator} />
          <Route path="/quiz/:id" Component={Quiz} />
          <Route path="/" Component={QuizList} />
        </Switch>
      </Layout>
    )
  }
}

export default App
