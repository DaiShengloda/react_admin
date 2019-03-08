import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import CheckLogin from '../../components/CheckLogin/CheckLogin'

class App extends Component {
  render() {
    return(
      <Router>
        <div className="app">      
          <CheckLogin></CheckLogin>
          <Route path='/login' component={Login}></Route>
          <Route path='/index' component={Dashboard}></Route>
        </div>
      </Router>
    )
  }
}

export default App