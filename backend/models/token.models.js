const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true, trim: true },
    chain_id: { type: Schema.Types.ObjectId, ref: "Network" },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
