import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Add from './components/pages/Add';
import Doc from './components/doc/Doc';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Profile from './components/pages/Profile';

import AuthState from './context/Auth/AuthState';
import DocState from './context/Docs/DocState';

const App = () => {
  return (
    <AuthState>
      <DocState>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path = '/login' component={Login} />
              <Route exact path = '/signup' component={Signup} />
              <Route exact path = '/profile' component={Profile} />
              <Route exact path = '/' component={Home} />
              <Route exact path = '/add' component={Add} />
              <Route exact path = '/doc' component={Doc} />
            </Switch>
          </Fragment>
        </Router>
      </DocState>
    </AuthState>
  )
}

export default App
