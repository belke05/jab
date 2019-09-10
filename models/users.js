const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: {
    type: String,
    required: true
  },
  imgPath: { type: String },
  fighter: {
    type: Schema.Types.ObjectId, ref : "Fighters"

  },
  leagueTag: [{type:String}],
  leagues:[{
    type: Schema.Types.ObjectId, ref : "Leagues"
  }]
 ,
  created: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
