const mongoose = require("mongoose")

const TestimonialSchema = new mongoose.Schema({
    details : {
        type : String,
        required : true
    },
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
    }

});

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial;