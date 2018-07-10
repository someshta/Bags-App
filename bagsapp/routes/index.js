require('dotenv').config({path: '../.env'});
const express = require("express");
const Router = express.Router();
const controller = require("../controller");
const db = require("../models");
const axios = require("axios");
// const accountSid = process.env.TWILIO_ACCT_SID;
const accountSid = "AC9d11bb0f67906143f66daaee512bc036";
// const authToken = process.env.TWILIO_TOKEN;
const authToken = "15d87cef2a383c7b4fb4ac4944925b53";
const client = require('twilio')(accountSid, authToken);


//checking if user is logged in
const isUserLoggedIn = req => {
    if (req.session){
        const sessionUserId = req.session.userIds.find(id => {
            return id === req.params.userId
        })
        return req.params.userId === sessionUserId;
    } else{
        return false;
    }
}

//middleware verifying if user is logged in
const verifyLogIn = (req, res, next) => {
    if (isUserLoggedIn(req)) {
        next()
    }else {
        return res.json({error: "not-loggedin"})
    }
}

// route to create new user
Router.post('/user', function(req, res, next) {
    //create user 
    if (req.body.name && req.body.email && req.body.password && req.body.phone){
        controller.createUser(req.body, (err, newUser) => {
        if(err){
            console.log(err)
            res.status(500).json(err)
        }else {
            res.json({newUser})    
        }
        })
    }
    else {
        var err = 'All fields required.' //this is what is sent to terminal
        err.status = 400;
        res.send('All fields required'); //this is what gets console.logged
        return next(err); //sent to terminal
    }
    
});

//route for user login
Router.post('/login', function(req, res){
    controller.getUser(req.body.email, req.body.password, (error, user) => {
        if(error) {
            console.log("error: " + error)
            res.json(error)
        }else {

            if (req.session.userIds){
                req.session.userIds.push(user._id)
            } else{
                req.session.userIds = [user._id];
            }            
            // res.json({user})
            res.json({user})
        }
    })
});

//getting latest reminder time stamp
Router.post('/checktime', function(req, res){
    var user = req.body.userId;
    var store = req.body.storeId;

    controller.checkReminderTimestamp(user, store, (err, info) => {
        if(err){
            console.log(err)
            res.status(500).send()
        }else{
            res.json(info)
        }
    })
})

//creates reminder & sends sms to user
Router.post('/reminder', function(req, res) {

    var reminder = {
        storeId: req.body.storeId,
        userId: req.body.userId,
        storeName: req.body.storeName
    };
    controller.saveReminder(reminder, (err, newReminder) => {
        if(err){
            console.log(err);
            res.status(500).send();
        }else{

            client.messages
            .create({
                body: req.body.body,
                from: "+19162498645",
                to: req.body.to
            })
            res.json(newReminder);
        }
    })
})

//route to save store to user id
Router.post('/stores/:userId', verifyLogIn, function(req, res) {

    // The body is coming in as lat, lng
    // Change it to location: [lat, lng]
    const {lat, lng} = req.body;
    if (!Number(lat) || !Number(lng)) return res.json({error: "Expecting numerical lat & lng"})

    const location = [Number(lat), Number(lng)];
    const store = {
        name: req.body.name,
        address: req.body.address,
        googleId: req.body.googleId,
        location
    }
    controller.saveStore(store, req.params.userId, ((err => {
        if(err){
            console.log(err)
            res.status(500).send()
        }else {
            res.status(200).send(store)
        }
    })))
})

// route to show all stores user id has saved
Router.get('/stores/:userId', verifyLogIn, function(req, res){
    var userId = req.params.userId;
    controller.findAllStores(userId, (err, allStores) => {
        if(err){
            console.log(err);
            res.status(500).send()
        }else{
            res.json(allStores)

        }   
    })
})

//route to delete store from user id
Router.delete('/stores/:storeId/user/:userId', function(req, res){
    var userId = req.params.userId;
    var storeId = req.params.storeId;

    controller.deleteStore(userId, storeId, (err) => {
        if(err){
            console.log(err);
            res.status(500).send()
        }else {
            res.status(200).send()
        }
    })
})

//route for user logout
Router.get('/logout/:userId', function(req, res) {
    //if there is a session...
    if (req.session) {
        // find the userId index of all the current logged in users
        const {userId} = req.params;
        const userIdIndex = req.session.userIds.findIndex(id => {
            return id === userId;
        })
        //if the user exists in the index, remove user from userIdsIndex
        if (userIdIndex !== -1){
            req.session.userIds = [...req.session.userIds.slice(0, userIdIndex), ...req.session.userIds.slice(userIdIndex+1)]
            return res.status(200).json({message: "bye"});
        }            
    } else {
        return res.status(200).send();
    }
})

//API call
Router.get('/getstores/:lat/:lng/:query',  function(req, res) {
    const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=32000&&keyword=${req.params.query}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
    axios.get(URL).then(result => {
        res.send(result.data)
    }).catch(err =>{
        console.log(err);
    })    
})


//exporting Router, being used in the app.use in server.js
module.exports = Router;
