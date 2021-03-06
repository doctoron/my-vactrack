const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// change all lines below to match our database
const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }

});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
