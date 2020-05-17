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
import Common from './components/layouts/Common';

const App = () => {
  return (
    <AuthState>
      
          <Router>
            <Fragment>
            <Common />
              <Switch>
                <Route exact path = '/login' component={Login} />
                <Route exact path = '/signup' component={Signup} />
                <PrivateRoute exact path = '/' component={Home} />
                <PrivateRoute exact path = '/profile' component={Profile} />
                <PrivateRoute exact path = '/add' component={Add} />
                <DocState>
                <Route exact path = '/doc' component={Doc} />
                </DocState>
              </Switch>
            </Fragment>
          </Router>
        
    </AuthState>
  )
}

export default App
