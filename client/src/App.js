import React, { Fragment, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute'
import Add from './components/pages/Add';
import Doc from './components/doc/Doc';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Profile from './components/pages/Profile';

import AuthState from './context/Auth/AuthState';
import DocState from './context/Docs/DocState';

import './App.css';

const App = () => {
  return (
    <AuthState>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path = '/login' component={Login} />
              <Route exact path = '/signup' component={Signup} />
              <PrivateRoute exact path = '/' component={Home} />
              <Route exact path = '/profile' component={Profile} />
              <Route exact path = '/add' component={Add} />
              <PrivateRoute exact path = '/doc' component={Doc} />
            </Switch>
          </Fragment>
        </Router>
    </AuthState>
  )
}

export default App
