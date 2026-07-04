const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    countInStock: { type: Number, default: 0 },
    brand: { type: String, default: "Unknown" },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
