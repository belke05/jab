const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fighterSchema = new Schema({
  name : String,
  imgPath : String,
  gifPath: String
})

const Fighters = mongoose.model("Fighters", fighterSchema);

module.exports = Fighters;