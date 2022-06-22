const Order = require("../models/order.model");
const Product = require("../models/product.model");
const ErrorHander = require("../utils/handleError");

exports.newOrder = async (req, res, next) => {
  try {
   
    // console.log(req.body)
    const order = await Order.create(req.body);

    res.status(201).send(order);
  } catch (err) {
    // console.log("err : ", err.message);
    return res.status(500).send({ message: err.message });
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    res.status(200).send(order);
  } catch (err) {
    // console.log("err : ", err.message);
    return res.status(500).send({ message: err.message });
  }
};




exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).send({
      totalAmount,
      orders,
    });
  } catch (err) {
    // console.log("err : ", err.message);
    return res.status(500).send({ message: err.message });
  }
};

exports.deleteOrder = async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return next(new HandleError(404, "order not found."));
      }
  
      await order.remove();
  
      res.status(200).send({
        success: true,
        message: "Order Delete Successfully",
      });
    } catch (err) {
      // console.log("err : ", err.message);
      return res.status(500).send({ message: err.message });
    }
  };



async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  