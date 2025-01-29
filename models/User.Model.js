const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
  },
  country: {
    type: String,
  },
  State: {
    type: String,
  },
  city: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
