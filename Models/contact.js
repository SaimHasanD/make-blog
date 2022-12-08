const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    image : {
        type : String,
        required : false
    },

    title : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },

});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;