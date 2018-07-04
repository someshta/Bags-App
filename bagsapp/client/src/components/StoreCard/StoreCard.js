import React from "react";
import Styles from "./StoreCard.css";
// import SaveBtn from "../SaveBtn";
class StoreCard extends React.Component {
    state= {
        saved: false
    }

    componentWillReceiveProps(nextProps){
        // if nextProps.data.saved !=== this.state.saved
        // reset our state to nextProps.data.saved
        if(nextProps.data.saved !== this.state.saved){
            this.setState({
                saved: nextProps.data.saved
            })
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row storeRow">
                    <div className="col-sm storeInfo">
                        <h3>{this.props.data.name}</h3>
                    </div>
                    <div className="col-sm storeInfo" id="address">
                        <p>{this.props.data.vicinity}</p>
                    </div>
                    <div className="col-sm storeInfo" id="distance">
                        <p>{this.props.data.dist} miles</p>
                    </div>
                    <div className="col-sm storeInfo">
                        {this.props.data.saved === false ? <p>False</p> : <p>True</p>}
                    </div>
                    <div className="col-sm storeInfo">
                        <button id="saveBtn" type="button" onClick={() => this.props.savestore(this.props.data.name, this.props.data.vicinity, this.props.data.geometry.location.lat, this.props.data.geometry.location.lng, this.props.data.id)}>Save</button> 
                    </div>
                </div>    
            </div>
        );
    }
}

export default StoreCard;