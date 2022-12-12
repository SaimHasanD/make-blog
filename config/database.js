// // Import the mongoose module
// const mongoose = require("mongoose");
// const {DB_URL} =require("./index");

// Local host
// const startDBConnection=()=>{
//     // Set up default mongoose connection
//     const mongoDB = DB_URL;
//     mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
//         console.log("DB server started")
//     }).catch((err)=>{
//         console.log("Something went wrong due to :"+err)
//     });

//     // Get the default connection
//     const db = mongoose.connection;

//     // Bind connection to error event (to get notification of connection errors)
//     db.on("error", console.error.bind(console, "MongoDB connection error:"));
// }

// startDBConnection();


// Import the mongoose module
const mongoose = require("mongoose");
const {DB_URL} =require("./index");

// Cloud MongoDB
const startDBConnection=()=>{
    // Set up default mongoose connection
    const mongoDB = "mongodb+srv://make-blok:ELWHIL8oWnBqqNQe@cluster0.gkrkxn8.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        console.log("DB server started")
    }).catch((err)=>{
        console.log("Something went wrong due to :"+err)
    });

    // Get the default connection
    const db = mongoose.connection;

    // Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

startDBConnection();

// // ELWHIL8oWnBqqNQe