const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: { type: String, required: true},
    address: {type: String},
    location: {
        type: [Number],
        index: "2d"
    },
    googleId: {type: String, unique: false}
    // distance: {type: String, required: true}
});

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;