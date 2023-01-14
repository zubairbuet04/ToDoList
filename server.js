console.log("+++++=====")
const express = require('express'); //developer module, not a core module
const app = express(); //This is how the power of express has been extracted
//express is a core module, so no need to install on the terminal
//On the contrary, express helmet mongoose morgan cors are to be installed through npm registry
const helmet = require('helmet'); // helmet provides 13 types of securities by setting HTTP Headers properly, see documentation
const mongoose = require("mongoose");
require("dotenv").config(); //npm install mongodb dotenv
const morgan = require("morgan"); //
const cors = require('cors'); //helps to run the server in two ports, frontend in one port and backend in the other
const { readdirSync } = require("fs") //reads the content of a directory/folder sunchronously


// These are express methods including some Middlewares
app.use(helmet())
app.use(express.static('public')); //html png etc. these static files are placed inside public folder
app.use(express.json()) //necessary to communicate json payloads/data
app.use(express.urlencoded({ extended: false })); //necessary to communicate req-res data through url
app.use(morgan("dev"));
app.use(cors());


// DB Connection
mongoose
    .connect(process.env.DATABASE_1)  //open MongoDb-Server-6.0-bin-write cmd in path space-write mongosh; it is mongo.exe for 5.0 version
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));
   

// routes middleware
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))

// server
//const port = process.env.PORT;


app.listen(8000, () => {
    console.log("App is running on port 8000")
    //console.log(`App is running on port ${port}`);
});