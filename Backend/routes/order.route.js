const express = require("express");
const { newOrder, getSingleOrder, getAllOrders, deleteOrder } = require("../controllers/order.controller");

const router = express.Router();

router.route("/order/new").post(newOrder);
router.route("/order/:id").get(getSingleOrder);
router.route("/orders").get(getAllOrders);
router.route("/order/:id").delete(deleteOrder);

module.exports = router;