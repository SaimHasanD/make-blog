const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    facebook : {
        type : String,
        required : false
    },
    twitter : {
        type : String,
        required : false
    },
    instagram : {
        type : String,
        required : false
    },
    linked : {
        type : String,
        required : false
    },

});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;