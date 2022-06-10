const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    brandID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: true,
    },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true
    
  }
);

module.exports = mongoose.model("product", productSchema);

