import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import Header from './components/Header/Header';
import routes from './routes';
import {withRouter} from 'react-router-dom';

const App = (props) => {
  return (
    <div className="App">
      {props.location.pathname === "/"
      ?
      null
      :
      <div>
        <Nav/>
        <Header/>
      </div>
      }
      {routes}
    </div>
  );
}

export default withRouter(App);