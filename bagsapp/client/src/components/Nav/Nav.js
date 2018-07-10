import React from "react";
import Styles from "./Nav.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from '../../pages/Home';
import HowToInstall from '../../pages/HowToInstall';
import CreateAcct from '../../pages/CreateAcct';
import MyStores from '../../pages/MyStores';
import SignIn from '../../pages/SignIn';
import { Link } from "react-router-dom";

const Nav = () => {
  const user = localStorage.getItem('userId');
  if (!user) {
    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand" >BAGS</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bags-navbar" aria-controls="bags-navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="bags-navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <Link to="/" className={window.location.pathname === "/" ? "nav-link" : "nav-link"}>Home</Link>
          </li>
          <li className="nav-item">
          <Link to="/install" className={window.location.pathname === "/install" ? "nav-link" : "nav-link"}>Install</Link>
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
  }else {
    return(
  <div>
  {/* <div className="navbar navbar-expand-lg navtop"></div> */}
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <span className="navbar-brand" >BAGS</span>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bags-navbar" aria-controls="bags-navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

  <div className="collapse navbar-collapse" id="bags-navbar">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
      <Link to="/userhome" className={window.location.pathname === "/userhome" ? "nav-link" : "nav-link"}>Home</Link>
      </li>
      <li className="nav-item">
      <Link to="/install" className={window.location.pathname === "/install" ? "nav-link" : "nav-link"}>Install</Link>
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
  
}

export default Nav;

