const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
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
    slug : {
        type : String,
        required : true
    }

});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;