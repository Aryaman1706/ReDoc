import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Add from './components/pages/Add'

const App = () => {
  return (
    <Fragment>
      <Navbar />
        <Router>
          <Route exact path = '/add' component={Add} />
        </Router>
    </Fragment>
  )
}

export default App
