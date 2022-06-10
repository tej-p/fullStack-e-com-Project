const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    res.status(200).send({ data: users, message: "success" });
  }
  catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.post("/new", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send({ data: user, message: "success" });
  }
  catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();

    if (!user) {
      return res
        .status(404)
        .send({ data: user, message: "error", er: "User not found, check credentials" });
    }
    return res.status(200).send({ data: user, message: "success" });
  } 
  catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send({ data: user, message: "success" });
  } 
  catch (er) {
    res.status(500).send({ data: [], message: "er", er: er.message });
  }
});

router.get("/:id/address", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const address = user.Address;

    return res.status(201).send({ data: address, message: "success" });
  } 
  catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.patch("/:id/addresses/create", async (req, res) => {
  try {
    const Address = await User.updateOne(
      { _id: req.params.id },
      { $push: { Address: req.body } }
    );
    if (Address.acknowledged === true) {
      const user = await User.findById(req.params.id).lean().exec();
      return res.status(201).send({ data: user.Address, message: "success" });
    }
    return res
      .status(404)
      .send({ data: Address, message: "error", er: "something went wrong" });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

router.patch("/:id/addresses/:idx/edit", async (req, res) => {
  try {
    const update = await User.updateOne(
      { _id: req.params.id, "Address._id": req.params.idx },
      { $set: { "Address.$": req.body } }
    );
    if (update.acknowledged === true) {
      const user = await User.findById(req.params.id).lean().exec();
      return res.status(201).send({ data: user.Address, message: "success" });
    }
    return res
      .status(404)
      .send({ data: update, message: "error", er: "something went wrong" });
  } catch (er) {
    res.status(500).send({ data: [], message: "error", er: er.message });
  }
});

module.exports = router;
