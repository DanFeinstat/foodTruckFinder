const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    index: { unique: true },
  },
  email: {
    type: String,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 240,
  },
  location: { type: Array, default: [] },
  active: { type: Boolean, default: false },
});

OwnerSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model(`Owner`, OwnerSchema);
