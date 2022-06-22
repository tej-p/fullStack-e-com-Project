const User = require("../models/user.model");

exports.registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body );

    res.status(201).send(user);
  } catch (err) {
    // console.log("err : ", err.message);
    return res.status(500).send({ message: err.message });
  }
};

