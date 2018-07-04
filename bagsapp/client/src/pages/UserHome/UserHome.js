import React from "react";
import Styles from "./UserHome.css";
import Nav from '../../components/Nav';
import SearchForm from '../../components/SearchForm';
import geoDist from "geodist";
// import API from "../../../utils/API.js";
import axios from "axios";
import StoreCard from '../../components/StoreCard';
import SearchHeader from '../../components/SearchHeader';
import SaveBtn from '../../components/SaveBtn';


class UserHome extends React.Component {

    state = {
        search: '',
        headline: "Stores Near You",
        results: [],
        lat: '',
        lng: '',
        saved: {}
    };

    componentDidMount(){
        
        this.watchID = navigator.geolocation.watchPosition(this.handleSuccess, function(error){
            console.log(error);
        });

        this.getUsersStores();
        
    }

    handleSuccess  = position => {
        console.log(position)
        this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
        this.makeApiCall(this.state.lat, this.state.lng, "grocery store " + this.state.search);
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID)
    }

    getUsersStores = () => {
        const user = localStorage.getItem('userId');

        axios.get(`/stores/${user}`)
        .then(response => {
            const mySaved = {};
            const stores = response.data[0].stores;
            
            stores.map(store => mySaved[store.googleId] = true)
            
            this.setState({
                saved: mySaved
            })

        }).catch(err => {
            console.log(err)
        })
        console.log("state: ", this.state.saved);
    }

    //makes query and sets state to results
    makeApiCall = (lat, lng, query) => {
        
        axios.get(`/getstores/${lat}/${lng}/${query}`).then(res => {
            //save results in variable
            console.log("response", res);
            var stores = res.data.results;
            
            if (stores.length === 0) {
                this.setState({
                    headline: "Sorry, no results were found. Search again.",
                    results: []
                })
            }else {
            // console.log("stores", stores);
            //map over stores and add a distance value for the store location compared to user location
            stores.map(store => {
                store.dist = this.distance(this.state.lat, this.state.lng, store.geometry.location.lat, store.geometry.location.lng)

                if(this.state.saved[store.id]) {
                    store.saved = true;
                }else{
                    store.saved = false;
                }
                
            });
            //sort array of stores by distance
            stores.sort(((store1, store2) => {
                return store1.dist - store2.dist
            }));
            this.setState({
                results: stores
            })}
        
        })
    }

    

    handleSubmit = event => {
        event.preventDefault();
        this.makeApiCall(this.state.lat, this.state.lng, "grocery store " + this.state.search);
        this.setState({
            headline: "Results for " + this.state.search
        })
    };

    //function to calculate distance between two points with latitude & longitude
    distance = (lat1, lon1, lat2, lon2, unit) => {
        let dist = Number(geoDist({lat: lat1, lon: lon1}, {lat: lat2, long: lon2}, {exact: true, unit: "mi"})).toFixed(2);
        return dist
    }

    handleSaveStore = (name, address, lat, lng, storeId) => {
        const user = localStorage.getItem('userId');
        const store = {
            name: name,
            address: address,
            lat: lat,
            lng: lng,
            googleId: storeId
        }
        console.log(store);
        axios.post(`/stores/${user}`, store)
        .then(response => {
            // console.log(response.data);
            // store.saved = true;

            // Update this store in our state
            // Find index of the store by id
            const storeIdx = this.state.results.findIndex(result => result.id === storeId);

            const newStore = {...this.state.results[storeIdx], saved: true}
            // slice the state content before this store idx
            // [.slice(0, idx), store, .slice(idx+1)]
            this.setState({
                results: [...this.state.results.slice(0, storeIdx), newStore, ...this.state.results.slice(storeIdx+1)]
            })

            console.log(newStore);
        }).catch(err => {
            console.log(err)
        })
    

    }

    

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value  }); 
    };

    render() {
        return(
            <div> 
                <SearchForm
                        value={this.state.search}
                        onChange={this.handleChange}
                        onClick={this.handleSubmit}
                />
                <SearchHeader headline={this.state.headline} />
                {this.state.results.map(result => (
                    <StoreCard key={result.id} data={result} savestore={this.handleSaveStore} ></StoreCard>
                ))}
            </div>
        );  
    }  
}

export default UserHome;