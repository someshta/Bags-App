const db = require("../models");

module.exports = {
    //create new user
    createUser: function(user, cb) {
        db.User
        .create(user, ((err, newUser) => cb(err, newUser)))
    },

    //authenticate user(login)
    getUser: function(email, password, cb) {
        db.User.authenticate(email, password, cb)
    },

    //save store to user
    saveStore: function(store, userId, cb) {
        
        db.Store
        .create(store, (err, newStore) => {
            if (err) return cb(err);
            console.log(newStore);
            db.User
            .findByIdAndUpdate(userId, { $push: {stores: newStore._id }}, cb)
        })
    },

    //find all saved stores of user
    findAllStores: function(userId, cb){
        db.User
        .find({_id: userId})
        .populate("stores")
        .exec(function(err, allStores) {
            cb(err, allStores)
        })
    },

    //delete store from user
    deleteStore: function(userId, storeId, cb) {
        db.Store.remove({_id: storeId}, (err) =>{
            if (err) cb(err)

            db.User
            .findOneAndUpdate({_id: userId}, { $pull: {stores: storeId}}, function(err){
                cb(err)
            })
        })
        
    },

    //save reminder
    saveReminder: function(reminder, cb) {
        db.Reminder
    .update(
        { $and: [{userId: reminder.userId}, {storeId: reminder.storeId}]},
        {$set:{time: new Date()}},
        {upsert: true, new: true},
        ((err, newReminder) => cb(err, newReminder)))
},

    //check reminder timestamp
    checkReminderTimestamp: function(userId, storeId, cb) {
        db.Reminder
        .find({ $and: [{userId: userId}, {storeId:storeId}]}).then(reminder => cb(null, reminder))
    }

}