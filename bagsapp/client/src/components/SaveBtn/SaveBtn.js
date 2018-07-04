import React from "react";
import Styles from "./SaveBtn.css";

class SaveBtn extends React.Component{
    state = {
        saved: false
    }
    
    render(){
        return(
            <button saved={this.state.saved}>Save</button>
        );
    }
}

export default SaveBtn;