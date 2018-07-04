import React from "react";
import Styles from "./Header.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div className="container-fluid header">
            <div className="row">
                <div className="col-sm first">
                    <h1 id="homeHeader">Never leave your bags behind again</h1>
                    <p>Old habits die hard. We know how tough it is to form new ones. We also know how badly you want to remember to bring all those bags that are sitting in your car into the store with you. Bags is here to help. </p>
                    <button className="createAcct" type="button"><Link className="createAcct" to="/createaccount" className={window.location.pathname === "/createaccount"}>Create account</Link>
                    </button>
                </div>
                <div className="col-sm trunk">
                    <img  id="trunk" src={require("../../images/canvasbag.jpg")} alt="bag"/>
                </div>
            </div>
        </div>
    )
}

export default Header;