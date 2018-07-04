import React from "react";
import Styles from "./Nav.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from '../../pages/Home';
import About from '../../pages/About';
import CreateAcct from '../../pages/CreateAcct';
import MyStores from '../../pages/MyStores';
import SignIn from '../../pages/SignIn';
import { Link } from "react-router-dom";

const Nav = () => {
  const user = localStorage.getItem('userId');
  if (user) {
    return(
      <div>
      <div className="navbar navbar-expand-lg navtop"></div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/userhome" className={window.location.pathname === "/userhome" ? "navbar-brand" : "navbar-brand"}>BAGS</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <Link to="/userhome" className={window.location.pathname === "/userhome" ? "nav-link" : "nav-link"}>Home</Link>
          </li>
          <li className="nav-item">
          <Link to="/about" className={window.location.pathname === "/about" ? "nav-link" : "nav-link"}>About</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          <Link to="/mystores" className={window.location.pathname === "/mystores" ? "nav-link" : "nav-link"}>My Stores</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/signin" onClick={()=>localStorage.clear(user)}>Log Out</Link>
          </li>
        </ul>
      </div>
    </nav> 
    </div>
    ); 
  }
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className={window.location.pathname === "/" ? "navbar-brand" : "navbar-brand"}>BAGS</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"         aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <Link to="/" className={window.location.pathname === "/" ? "nav-link" : "nav-link"}>Home</Link>
          </li>
          <li className="nav-item">
          <Link to="/about" className={window.location.pathname === "/about" ? "nav-link" : "nav-link"}>About</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          <Link to="/signin" className={window.location.pathname === "/signin" ? "nav-link" : "nav-link"}>Sign In</Link>
          </li>
          <li className="nav-item">
          <Link to="/createaccount" className={window.location.pathname === "/createaccount" ? "nav-link" : "nav-link"}>Create Account</Link>
          </li>
        </ul>
      </div>
    </nav> 
  );
}

export default Nav;