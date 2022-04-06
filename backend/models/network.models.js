const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const networkSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    url: { type: String, required: true, unique: true, trim: true },
    token: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Network = mongoose.model("Network", networkSchema);

module.exports = Network;
