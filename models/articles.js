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
    type: String,
    enum: [
      "Khabib Nurmagomedov",
      "Georges St-Pierre",
      "Anderson Silva",
      "Jon Jones",
      "Daniel Cormier",
      "Conor McGregor",
      "Amanda Nunes",
      "Ronda Rousey",
      "Cris Cyborg"
    ]
  },
  leagues: [
    {
      type: String,
      enum: [
        "ufc",
        "one championship",
        "bellator",
        "world series of fighting",
        "invicta",
        "ksw"
      ]
    }
  ],
  created: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
