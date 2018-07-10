import React from "react";
import Styles from "./Home.css";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    return(
        <div className="container-fluid">
            <Header />
            <hr/>
            <div className="row home-how-it-works">
                <div className="col-sm home-how-it-works-title">
                    <h1 >How it works</h1>
                    <br/>
                </div>
            </div>
            <div className="row home-how-it-works">
                <div className="col-sm how-it-works-step">
                    <img className="step-img"src={require("../../images/add-user.svg")} alt="stepimg" />
                    <h3 className="home-how-it-works-text">Create an account</h3>
                    <p className="home-how-it-works-text"> Creating an account is easy and free. Click <Link className="link-to-create"to="/createaccount">here</Link> to sign up with us.</p>
                </div>
                <div className="col-sm how-it-works-step">
                    <img className="step-img" id="heart-pin" src={require("../../images/heartpin.svg")} alt="stepimg" />
                    <h3 className="home-how-it-works-text">Save the stores you frequent most</h3>
                    <p className="home-how-it-works-text">Search for grocery stores and save your favorites.</p>
                </div>
                <div className="col-sm how-it-works-step">
                    <img className="step-img" src={require("../../images/newtext.png")} alt="stepimg" />
                    <h3 className="home-how-it-works-text">A reminder text will be sent to your phone</h3>
                    <p className="home-how-it-works-text">When you arrive at your store, we'll remind you about your bags.</p>
                </div>
            </div>
            <br/> 
        </div> 
    );
}

export default Home;