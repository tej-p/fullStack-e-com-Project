const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors")

app.use(express.json());


//-------------------------Routes---------------------------------
const product = require("./routes/product.route");
const user = require("./routes/user.route");
const order = require("./routes/order.route");


app.use("/", product);
app.use("/user", user);
app.use("/", order);

app.use(errorMiddleware);



//-------------------------error middleware---------------------------------




module.exports = app;