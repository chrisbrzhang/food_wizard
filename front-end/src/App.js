import './App.css';
import {
  BrowserRouter as Router,
  Routes,
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
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';


export default function App() {
  return (
    <Router>
      <NavBar/>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage/>} />
        </Routes>
      </div>
    </Router>
  );
}







