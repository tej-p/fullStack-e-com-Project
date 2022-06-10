const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("brand", brandSchema);

