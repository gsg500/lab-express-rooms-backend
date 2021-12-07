const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  passwordHash: { type: String, required: true },
  rooms: [{ type: mongoose.Types.ObjectId, ref: "room" }],
  reviews: [{ type: mongoose.Types.ObjectId, ref: "review" }],
});

module.exports = mongoose.model("User", UserSchema);