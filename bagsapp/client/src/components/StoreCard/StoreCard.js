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
                {this.props.data.saved === false ?
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
                            <button id="saveBtn" type="button" onClick={() => this.props.savestore(this.props.data.name, this.props.data.vicinity, this.props.data.geometry.location.lat, this.props.data.geometry.location.lng, this.props.data.id)}><i className="fas fa-heart fa-lg"></i> </button> 
                        </div>
                    </div>   
                    
                
                        : <div className="row already-saved-row">
                            <div className="col-sm already-saved-info">
                                <h3>{this.props.data.name}</h3>
                            </div>
                            <div className="col-sm already-saved-info" id="address">
                                <p>{this.props.data.vicinity}</p>
                            </div>
                            <div className="col-sm already-saved-info" id="distance">
                                <p>{this.props.data.dist} miles</p>
                            </div>
                            <div className="col-sm already-saved-info">
                                <i className="fas fa-heart fa-lg alreadySavedHeart"></i> 
                            </div>
                        </div>
                }
                </div> 
        );
    }

}
export default StoreCard;