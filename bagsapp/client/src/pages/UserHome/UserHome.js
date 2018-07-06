import React from "react";
import Styles from "./UserHome.css";
import Nav from '../../components/Nav';
import SearchForm from '../../components/SearchForm';
import geoDist from "geodist";
import axios from "axios";
import StoreCard from '../../components/StoreCard';
import SearchHeader from '../../components/SearchHeader';
// const accountSid = 'AC9d11bb0f67906143f66daaee512bc036';
// const authToken = '15d87cef2a383c7b4fb4ac4944925b53';
// const client = require('twilio')(accountSid, authToken);
// import SaveBtn from '../../components/SaveBtn';


class UserHome extends React.Component {
    //states for UserHome
    state = {
        search: '',
        headline: "Stores Near You",
        results: [],
        currentLat: '',
        currentLng: '',
        lastKnownLat: '38.745793',
        lastKnownLng: '-121.256906',
        saved: {},
        savedLocations: []
    };

    //triggering watchID and getting users saved stores when page loads
    componentDidMount(){
        
        // if(this.distance(this.state.currentLat, this.state.currentLng, this.state.lastKnownLat, this.state.lastKnownLng) > 5){
        this.watchID = navigator.geolocation.watchPosition(this.handleSuccess, function(error){
            console.log(error);
        })
    // );
    // }else{
        // this.reSortStores;
    // }
        this.getUsersStores();
        // this.checkLocation(this.state.currentLat, this.state.currentLng, this.state.lastKnownLat, this.state.lastKnownLng);
    }


    sendReminder = () =>{
        const userPhone = localStorage.getItem('userPhone');
        const reminder = {
            body: "Yo yo yo",
            to: "+1" + userPhone
        }

        axios.post('/sendsms', reminder)
        .then(response => console.log("text sent"))
    }


    //ONLY MAKE API CALL IF USER LOCATION HAS CHANGED BY A GREAT DISTANCE
    //if currentLat & currentLng > lastKnownLat & lastKnownLng by 5 miles, make API call
    //set lastKnownLat & Lng to coordinates of currentLat & Lng
    //else...
    //map through results index, use currentLat & Lng to compare with distance
    //re sort array based on distance
    //set state to newly arranged array
    checkLocation = (currentLat, currentLng, lastLat, lastLng) => {
        let distFromLast = this.distance(currentLat, currentLng, lastLat, lastLng)
        console.log(distFromLast);
        
        if (distFromLast > 5){
            console.log("you've moved 5+ miles");
            this.setState({
                lastKnownLat: this.state.currentLat,
                lastKnownLng: this.state.currentLng
            })
            
            // this.sendReminder();
            console.log("new state lat, lng", this.state.lastKnownLat, this.state.lastKnownLng);
            this.makeApiCall(this.state.currentLat, this.state.currentLng, "grocery store " + this.state.search);
        }else{
            this.setState({
                lastKnownLat: this.state.currentLat,
                lastKnownLng: this.state.currentLng
                
            })
            this.reSortStores();
        }
    }

    reSortStores = () => {
        const resultsCopy = this.state.results.map(array => ({...array}));
        
        resultsCopy.map(store => {
            store.dist = this.distance(this.state.currentLat, this.state.currentLng, store.geometry.location.lat, store.geometry.location.lng)})
        
            resultsCopy.sort(((store1, store2) => {
                return store1.dist - store2.dist
            }));
            this.setState({
                results: resultsCopy,
                headline: "Testing state"

            })
            console.log("sorted", this.state.results);
    }
    
    compareUserLocWithStoreLoc = () =>{
        let mi = mi;
        let userLat = this.state.currentLat;
        let userLng = this.state.currentLng;
        let storeLat = '';
        let storeLng = '';
        
        this.state.savedLocations.forEach(location => {
            storeLat = location[0].lat;
            storeLng = location[0].lng;
            let distBetween = this.distance(userLat, userLng, storeLat, storeLng);
            console.log(distBetween);
        })
    }

    //setting users location with lat & lng, then making API call to google places
    handleSuccess  = position => {
        console.log(position)
        this.setState({
            currentLat: position.coords.latitude,
            currentLng: position.coords.longitude
        })
        // this.makeApiCall(this.state.currentLat, this.state.currentLng, "grocery store " + this.state.search);
        this.checkLocation(this.state.currentLat, this.state.currentLng, this.state.lastKnownLat, this.state.lastKnownLng);
    }

    //clears watchID when user leaves page
    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID)
        document.body.style.backgroundColor = null;
    }

    //call to db to get users saved stores
    getUsersStores = () => {
        const user = localStorage.getItem('userId');

        axios.get(`/stores/${user}`)
        .then(response => {
            const mySaved = {};
            const myLoc = [];
            const stores = response.data[0].stores;
            // console.log("stores data", stores);
            stores.map(store => mySaved[store.googleId] = true)
            stores.map(loc => myLoc.push([{name: loc.name, lat: loc.location[0], lng: loc.location[1]}]));
            this.setState({
                saved: mySaved,
                savedLocations: myLoc
            })
            console.log(this.state.savedLocations);
            this.compareUserLocWithStoreLoc();
        }).catch(err => {
            console.log(err)
        })

        
    }

    //makes query and sets state to results
    makeApiCall = (lat, lng, query) => {
        
        axios.get(`/getstores/${lat}/${lng}/${query}`).then(res => {
            //save results in variable
            var stores = res.data.results;
            
            if (stores.length === 0) {
                this.setState({
                    headline: "Sorry, no results were found. Search again.",
                    results: []
                })
            }else {
            //map over stores and add a distance value for the store location compared to user location
            stores.map(store => {
                store.dist = this.distance(this.state.currentLat, this.state.currentLng, store.geometry.location.lat, store.geometry.location.lng)

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
            console.log("api call", this.state.results);
            
        })
        
    }

    //handling users search
    handleSubmit = event => {
        event.preventDefault();
        this.makeApiCall(this.state.currentLat, this.state.currentLng, "grocery store " + this.state.search);
        this.setState({
            headline: "Results for " + this.state.search
        })
    };

    //function to calculate distance between two points with latitude & longitude
    distance = (lat1, lon1, lat2, lon2, unit) => {
        let dist = Number(geoDist({lat: lat1, lon: lon1}, {lat: lat2, lon: lon2}, {exact: true, unit: "mi"})).toFixed(2);
        return dist
    }

    //function to save store to db
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

            // Update this store in our state
            // Find index of the store by id
            const storeIdx = this.state.results.findIndex(result => result.id === storeId);

            const newStore = {...this.state.results[storeIdx], saved: true}
            // slice the state content before this store idx
            this.setState({
                results: [...this.state.results.slice(0, storeIdx), newStore, ...this.state.results.slice(storeIdx+1)]
            })
        }).catch(err => {
            console.log(err)
        })
    }

    //handling input forms
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value  }); 
    };

    render() {
        return(
            <div className="user-home-body"> 
                <SearchForm
                        value={this.state.search}
                        onChange={this.handleChange}
                        onClick={this.handleSubmit}
                />
                <SearchHeader headline={this.state.headline} />
                {this.state.results.map(result => (
                    <div className="row">
                    <StoreCard key={result.id} data={result} savestore={this.handleSaveStore} ></StoreCard>
                    </div>
                ))}
            </div>
        );  
    }  
}

export default UserHome;