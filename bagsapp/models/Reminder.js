const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myDateString = Date();
const ReminderSchema = new Schema({
    storeId: { type: String, required: true},
    userId: {type: String, required: true},
    time: { type: Date, default: Date.now },
    storeName: {type: String, required: true}
    // distance: {type: String, required: true}
});

const Reminder = mongoose.model("Reminder", ReminderSchema);

module.exports = Reminder;