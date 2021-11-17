import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'; 
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js'


// import { BrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage'; 


export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={HomePage}/>
        </Switch>
      </div>
    </Router>
  );
}







