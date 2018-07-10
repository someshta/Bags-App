import React from "react";
import Styles from "./UserHome.css";
import Nav from '../../components/Nav';
import SearchForm from '../../components/SearchForm';
import geoDist from "geodist";
import axios from "axios";
import StoreCard from '../../components/StoreCard';
import SearchHeader from '../../components/SearchHeader';
import SavedStoreCard from "../../components/SavedStoreCard";


class UserHome extends React.Component {
    //states for UserHome
    state = {
        search: '',
        headline: "Stores Near You",
        results: [],
        currentLat: '',
        currentLng: '',
        saved: {},
        savedLocations: []
    };

    //triggering watchID and getting users saved stores when page loads
    componentDidMount(){
        this.watchID = navigator.geolocation.watchPosition(this.handleSuccess, function(error){
            console.log(error);
        })
        this.getUsersStores();
        
    }


    componentDidUpdate(){
        this.compareUserLocWithStoreLoc();
    }

        //clears watchID when user leaves page
    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID)
        document.body.style.backgroundColor = null;
    }

    //handling input forms
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value  }); 
    };

        //handling users search
    handleSubmit = event => {
        event.preventDefault();
        this.makeApiCall(this.state.currentLat, this.state.currentLng, "grocery store " + this.state.search);
        this.setState({
            headline: `Results for "${this.state.search}"`
        })
    };

        //setting users location with lat & lng, then making API call
    handleSuccess  = position => {
        console.log(position)
        this.setState({
            currentLat: position.coords.latitude,
            currentLng: position.coords.longitude
        })
        // console.log("location has been set", this.state.currentLat);
        this.makeApiCall(this.state.currentLat, this.state.currentLng, "grocery store " + this.state.search);
        // this.checkLocation(this.state.currentLat, this.state.currentLng, this.state.lastKnownLat, this.state.lastKnownLng);
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

    //call to db to get users saved stores
    getUsersStores = () => {
        const user = localStorage.getItem('userId');

        axios.get(`/stores/${user}`)
        .then(response => {
            const mySaved = {};
            const myLoc = [];
            const stores = response.data[0].stores;
            console.log("users stores", stores);
            stores.map(store => mySaved[store.googleId] = true)
            stores.map(loc => myLoc.push([{name: loc.name, lat: loc.location[0], lng: loc.location[1], googleId: loc.googleId, userId: user}]));
            this.setState({
                saved: mySaved,
                savedLocations: myLoc
            })
            console.log(this.state.savedLocations);
            // this.compareUserLocWithStoreLoc();
        }).catch(err => {
            console.log(err)
        })

        
    }

    //check if user is within distance of saved store
    compareUserLocWithStoreLoc = () =>{
        let mi = mi;
        let userLat = this.state.currentLat;
        let userLng = this.state.currentLng;
        let storeLat = '';
        let storeLng = '';
        
        this.state.savedLocations.forEach(location => {
            storeLat = location[0].lat;
            storeLng = location[0].lng;
            let name = location[0].name;
            let userId = location[0].userId;
            let googleId = location[0].googleId;
            
            let distBetween = this.distance(userLat, userLng, storeLat, storeLng);
            // console.log(distBetween);

            if(distBetween < .11) {
                // this.sendReminder(name, userId, googleId);
                this.checkLastReminder(name, userId, googleId)
            }
        })
    }

    //send user reminder message
    sendReminder = (storeName, userId, googleId) =>{

        const userPhone = localStorage.getItem('userPhone');
        const reminder = {
            body: `Are you at ${storeName}? Don't forget your bags!`,
            to: "+1" + userPhone,
            storeId: googleId,
            userId: userId,
            storeName: storeName
        }

        axios.post('/reminder', reminder)
        .then(response => {
            console.log("/reminder", response)
        });
    }

    //check when the last reminder was sent, as not to send too many
    checkLastReminder = (storeName, user, store) => {
        const userInfo = {
            userId: user,
            storeId: store,
            storeName: storeName
        }

        axios.post('/checktime', userInfo)
        .then(response => {
            console.log("checktime response", response);
            // maybe we've never sent a reminder for this store to this user => response.data.length === 0 => send a reminder
            if(!response.data.length) {
                console.log("never sent text, sending one now");
                return this.sendReminder(storeName, user, store)
            }
            
            // maybe we've sent a reminder for this store to this user before => check when the last reminder was sent
            // if it's been long enough, send a new one
            var timeBetween = this.convertTimestamp(response.data[0].time, Date.now());
            
            //if last reminder was sent more than two hours ago...okay to send a new one
            if (timeBetween > 7200000) {
                this.sendReminder(storeName, user, store);
                console.log("time between", timeBetween);
            }else {
                console.log("too soon to text");
            }
        })
    }

    //converts reminder timestamp into miliseconds
    convertTimestamp = (lastTime, currentTime) => {
        var last = new Date(lastTime);
        var current = new Date(currentTime);

        return current - last
    }
    

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