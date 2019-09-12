const Fighters = require("../models/fighters.js");
const Leagues = require("../models/leagues.js");
const mongoose = require("mongoose");
const data = require("../data.json");
// require("dotenv").config();

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useCreateIndex: true
// });

// mongoose.connection.on("connected", () =>
//   console.log("yay mongodb connected :)")
// );

// mongoose.connection.on("error", () => console.log("nay db error sorry :("));

function insertFighters() {
  Fighters.insertMany(data.Fighters)
    .then(dbRes => console.log(dbRes, "all good"))
    .catch(dbErr => console.log(dbErr, "error baby"));
}

function insertLeagues() {
  Leagues.insertMany(data.Leagues)
    .then(dbRes => console.log(dbRes, "all good"))
    .catch(dbErr => console.log(dbErr, "error baby"));
}

insertFighters();
insertLeagues();
