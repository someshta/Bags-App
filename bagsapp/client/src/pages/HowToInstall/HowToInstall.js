import React from "react";
import Styles from "./HowToInstall.css";
import Nav from '../../components/Nav';

const HowToInstall = () => {
    return(
        <div className="container-fluid">
            <div className="row install">
                <h1 id="install-title">How to install </h1>
            </div>
            <div className="row">
                <div className="col-sm install">
                    <h3>For iOS</h3>
                    <p><i className="i1 fas fa-shopping-bag fa-xs"></i>Open BAGS in Safari</p>
                    <p><i className="i2 fas fa-shopping-bag fa-xs"></i>Tap the share button</p>
                    <p><i className="i3 fas fa-shopping-bag fa-xs"></i>Tap "Add to Home Screen"</p>
                    <p><i className="i4 fas fa-shopping-bag fa-xs"></i>Name your shortcut BAGS</p>
                </div>
                <br/>
                <div className="col-sm install">
                    <h3>For Android</h3>
                    <p><i className="i1 fas fa-shopping-bag fa-xs"></i>Launch BAGS in Chrome</p>
                    <p><i className="i2 fas fa-shopping-bag fa-xs"></i>Tap the menu button</p>
                    <p><i className="i3 fas fa-shopping-bag fa-xs"></i>Tap "Add to Home Screen"</p>
                    <p><i className="i4 fas fa-shopping-bag fa-xs"></i>Name your shortcut BAGS</p>
                </div>
            </div>
            <br/>
        </div>
    );
}

export default HowToInstall;