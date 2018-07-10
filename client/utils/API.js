import axios from "axios";

export default {
    getNearbyStores: function() {
        return axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCv7732VpTFstqhwM60PehGgIzn01n9NM4"
        );
    }
};