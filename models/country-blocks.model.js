const mongoose = require("mongoose");

const CountryBlock = mongoose.model(
  "CountryBlock",
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      data: [{ type: String }]
    },
    { timestamps: true }
  )
);

module.exports = CountryBlock;
