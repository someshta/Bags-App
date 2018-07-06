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
            <div className="row">
                        <div className="col-sm app-purpose-div">
                            <p id="app-purpose">Reduce plastic bag waste. Save your dimes.</p>
                        </div>
                        
                </div>
            <div className="row">
            <div className="col-sm bagman-container">
                    <img id="bagman" src={require("../../images/bagshopper.jpg")} alt="bag man"/>
                </div>
                <div className="col-sm">
                <div id="facts-title"> Bag Facts </div>
                    <ul>
                        <li><i class="fas fa-shopping-bag fa-xs i1"></i>Americans use ~100 billion plastic bags per year - that requires 12 million barrels of oil to manufacture.</li>
                        <li><i class="fas fa-shopping-bag fa-xs i2"></i>The average family takes home almost 1,500 plastic bags each year. Only 1% of those bags are recycled.</li>
                        <li><i class="fas fa-shopping-bag fa-xs i3"></i>Plastic bags are used for an average of 12 minutes.</li>
                        <li><i class="fas fa-shopping-bag fa-xs i4"></i>It takes 500+ years for a plastic bag to degrade in a landfill.</li>
                    </ul>
                </div>
                
            </div>
            <hr className="home-hr" />

                                {/* -------------------------------------------------------------- */}


                <div className="row home-how-it-works">
                    <div className="col-sm home-how-it-works-title">
                        <h2>How it works</h2>
                        <p>YAda yada yada</p>
                    </div>
                </div>
                <div className="row home-how-it-works">
                    <div className="col-sm how-it-works-step">
                        <img className="step-img" id="heart-pin" src={require("../../images/heartpin.svg")} alt="stepimg" />
                        <h6>Save the stores you frequent most</h6>
                        <p>Search for your favorite grocery stores and save them to your account. Bags will keep track of where you are, in relation to their location.</p>
                    </div>
                    <div className="col-sm how-it-works-step">
                        <img className="step-img" src={require("../../images/bannerhalf.png")} alt="stepimg" />
                        <h6>One more thing to add</h6>
                        <p>Filler text</p>
                    </div>
                    <div className="col-sm how-it-works-step">
                        <img className="step-img"src="" alt="stepimg" />
                        <h6>One more thing to add</h6>
                        <p>Filler text</p>
                    </div>
                </div>
                


                                {/* -------------------------------------------------------------- */}

            {/* <div className="row home-page-row">
                <div className="col-sm save">
                    <img id="save" src={require("../../images/save.jpg")} alt="storecards img" />
                </div>
                <div className="col-sm text hesitate">
                    <h2>Save the stores you frequent most</h2>
                    <p>Search for your favorite grocery stores and save them to your account. Bags will keep track of where you are, in relation to their location. </p>
                </div>
            </div>
            <hr className="home-hr" />
            <div className="row home-page-row">
                <div className="col-sm text">
                    <h2>Your reminder will be sent to your phone as you arrive at your store</h2>
                    <p>When you're approaching your shopping destination, a simple alert will be sent to your phone reminding you to grab your bags.</p>
                </div>
                <div className="col-sm reminder">
                    <img id="reminder"img src={require("../../images/bannerhalf.png")} alt="phone alert image"/>
                </div>
            </div>*/}
            {/* <hr className="home-hr" />
            <div className="row home-page-row">
                <div className="col-sm hesitate">
                    <h2>Don't hesitate.</h2>
                    <p>Why wait? Reduce plastic bag waste and save your dimes. Start remembering your bags today.</p>
                    <button id="btmCreateAcct" type="button"><Link to="/createaccount" className={window.location.pathname === "/createaccount"}>Create Account</Link></button>
                </div>
            </div>  */}
        </div>    
    );
}

export default Home;