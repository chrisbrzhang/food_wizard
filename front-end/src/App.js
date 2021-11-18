import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css'; 

import NavBar from './NavBar';


// import { BrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';


export default function App() {
  return (
    <Router>
      <NavBar/>
      <div className="App">
        <Switch>
          <Route path="/" component={HomePage}/>
          <Route path="/about" component={AboutPage}/>
        </Switch>
      </div>
    </Router>
  );
}







