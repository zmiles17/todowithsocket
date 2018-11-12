const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checkListModel = new Schema({
    todo: {
        type: String,
        unique: true,
        // required: [true, "Enter a valid list item"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const checkList = mongoose.model("checkList", checkListModel);

module.exports = checkList;