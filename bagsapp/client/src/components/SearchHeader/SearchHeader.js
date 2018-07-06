import React from "react";
import Styles from "./SearchHeader.css";

const SearchHeader = props => {
    return(
        // <div className="container-fluid">
            <div className="row searchHeader">
                <div className="col-sm"> 
                    <h2>{props.headline}</h2>
                </div>
            </div>
        // </div>
    );
}

export default SearchHeader;