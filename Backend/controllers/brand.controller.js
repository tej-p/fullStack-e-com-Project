const express = require("express");
const Brand = require("../models/brands.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let brands = await Brand.find().lean().exec();

    res.status(200).send({ data: brands, message: success });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.post("/new", async (req, res) => {
  try {
    let brand = await Brand.create(req.body).lean().exec();
    res.status(201).send({ data: brand, message: "success" });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).lean().exec();

    if (!brand) {
      return res
        .status(404)
        .send({ data: brand, message: "error", er: "Brand is not found" });
    }
    return res.status(200).send({ data: brand, message: "success" });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send({ data: brand, message: "success" });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

module.exports = router;
