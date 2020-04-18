import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Board from './components/Board_firebase';
import CreateLogin from './components/CreateLogin';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";


const Root = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={CreateLogin} />
        <Route exact path="/create" component={CreateLogin} />
        <Route exact path="/join/:pandemicId" component={CreateLogin} />
        <Route exact path="/pandemic/:pandemicId" component={Board}/>
        <Route component={CreateLogin} />
      </Switch>
    </Router>
  )
}

var destination = document.querySelector('.root');

ReactDOM.render(<Root />, destination);
