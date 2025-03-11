const mongoose = require("mongoose");

const IpBlock = mongoose.model(
  "IpBlock",
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      data: [{ type: String }]
    },
    { timestamps: true }
  )
);

module.exports = IpBlock;
