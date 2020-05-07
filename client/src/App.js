import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Add from './components/pages/Add';
import Doc from './components/pages/Doc';
import Home from './components/pages/Home';

const App = () => {
  return (
    <Fragment>
      <Navbar />
        <Router>
        <Route exact path = '/' component={Home} />
          <Route exact path = '/add' component={Add} />
          {/* <Route exact path = '/doc' component={Doc} /> */}
        </Router>
    </Fragment>
  )
}

export default App
