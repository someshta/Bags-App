import React from "react";
import Styles from "./MyStores.css";
import SavedStoreCard from '../../components/SavedStoreCard';
import Nav from '../../components/Nav';
import axios from "axios";

class MyStores extends React.Component{
    
    state = {
        saved: []
    }

    componentDidMount(){
        this.getUsersStores();
    }

    getUsersStores = () => {
        const user = localStorage.getItem('userId');

        axios.get(`/stores/${user}`)
        .then(response => {
            this.setState({
                saved: response.data[0].stores
            })
        }).catch(err => {
            console.log(err)
        })
        console.log("state: ", this.state.saved);
    }

    

    deleteStore = (storeId) => {
            
            // this.setState({ saved: stores });
        const userId = localStorage.getItem('userId');

        axios.delete(`/stores/${storeId}/user/${userId}`)
        .then(response => {
            console.log("storehas been deleted: ", response);
            this.getUsersStores();
        })
        .catch(err => {
            console.log(err);
        })
    }




    render(){
        return(
        <div>
            <div>
                <h2>My Stores</h2>
            </div>
            <SavedStoreCard saved={this.state.saved} deletestore={this.deleteStore} />
        </div>
    );
}

}

export default MyStores;