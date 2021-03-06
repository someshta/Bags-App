import React from "react";
import Styles from "./Header.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div className="container-fluid header-container">
            <div className="row">
                <div className="col-sm header-left-col">
                    <h1>Never leave your bags behind again</h1>
                    <p className="header-p">Old habits die hard. We know how tough it is to form new ones. We also know how badly you want to remember to bring all those bags that are sitting in your car into the store with you. BAGS is here to help. </p>
                    <button className="createAcct" type="button"><Link to="/createaccount">Create account</Link>
                    </button>
                </div>
                <div className="col-sm header-image-div">
                    <img  id="header-image" src={require("../../images/canvasbag.jpg")} alt="bag"/>
                </div>
            </div>
        </div>
    )
}

export default Header;