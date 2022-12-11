const mongoose = require("mongoose")

const AboutSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : false
    },  
    details : {
        type : String,
        required : true
    },
    map : {
        type : String,
        required : false
    }
});

const About = mongoose.model("About", AboutSchema);

module.exports = About;