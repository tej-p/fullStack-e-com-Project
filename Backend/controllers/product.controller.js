const Product = require("../models/product.model.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const HandleError = require("../utils/handleError.js");

//------------------Admin - Create product--------------------
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).send(product);
  } catch (err) {
    // console.log("err : ", err.message);
    return res.status(500).send({ message: err.message });
  }
};

//-------------------------get product --------------------------

exports.getAllProducts = async (req, res) => {
  try {
    const perPageProducts = 10;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .paginate(perPageProducts);
    const products = await apiFeature.query;

    res.status(201).send({
      success: true,
      products,
      productsCount
    });
  } catch (err) {
    // console.log("err : ", err.message);
    return res.status(500).send({ message: err.message });
  }
};

//-------------------------get single product --------------------------

exports.getSingleProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new HandleError(404, "product not found."));
    }

    res.status(201).send({
      success: true,
      product,
    });
  } catch (err) {
    // console.log("err : ", err.message);
    return res.status(500).send({ message: err.message });
  }
};

//---------------------Admin - update product --------------------------

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new HandleError(404, "product not found."));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).send({
      success: true,
      product,
    });
  } catch (err) {
    // console.log("err : ", err.message);
    return res.status(500).send({ message: err.message });
  }
};

//---------------------Admin - delete product --------------------------

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new HandleError(404, "product not found."));
    }

    await product.remove();

    res.status(200).send({
      success: true,
      message: "Product Delete Successfully",
    });
  } catch (err) {
    // console.log("err : ", err.message);
    return res.status(500).send({ message: err.message });
  }
};
