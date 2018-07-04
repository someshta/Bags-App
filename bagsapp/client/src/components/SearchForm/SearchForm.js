import React from "react";
import Styles from "./SearchForm.css";

const SearchForm = props => {
    return(
        <div className="searchContainer">
        <form>
            <div className="form-group searchForm">
                <h1>Search</h1>
                <input type="text" name="search" id="search" className="form-control" placeholder="Search by store name, city or zip code" value={props.value} onChange={props.onChange}/>
                <input id="searchBtn" type="submit" onClick={props.onClick}/>                           
            </div>
        </form>
        </div>
    );
}

export default SearchForm;