const mongoose = require("mongoose")

const AboutSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    title1 : {
        type : String,
        required : false
    },  
    title2 : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    map : {
        type : String,
        required : true
    }
});

const About = mongoose.model("About", AboutSchema);

module.exports = About;