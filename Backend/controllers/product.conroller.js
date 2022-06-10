const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("Brand_ID").lean().exec();

    res.status(200).send({ data: products, message: "success" });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    let product = await Product.create(req.body).lean().exec();

    return res.status(201).send({ data: product, message: "success" });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("Brand_ID")
      .lean()
      .exec();

    if (!product) {
      return res.status(404).send({
        data: product,
        message: "error",
        error: "Product Not found..",
      });
    }
    return res.status(200).send({ data: product, message: "success" });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("Brand_ID")
      .lean()
      .exec();
    return res.status(201).send({ data: product, message: "success" });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

module.exports = router;

// exports.getAllProducts = (req,res)=> {
//     res.status(200).json({message:"Route is working!"})
// }
