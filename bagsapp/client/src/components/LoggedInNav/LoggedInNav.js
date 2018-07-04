import React from "react";
import Styles from "./LoggedInNav.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import UserHome from '../../pages/UserHome';
import About from '../../pages/About';
import MyStores from '../../pages/MyStores';
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = () => {
    const user = localStorage.getItem('userId');
    const logout = axios.get(`/logout/${user}`)
                .then(response => {
                    console.log(response.data);
                    console.log('you logged out!');
                }).catch(err => {
                    console.log(err)
                }) 
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
        <Link to="/mystores" className={window.location.pathname === "/mystores" ? "nav-link" : "nav-link"}>My Stores</Link>
        </li>
        <li className="nav-item">
        </li>
        <li className="nav-item"> 
        <a href={logout} className="nav-link">Log out</a>
        </li>
    </ul>
    </div>
</nav> 
);
}

export default Nav;