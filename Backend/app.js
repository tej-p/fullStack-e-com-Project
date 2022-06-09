const express = require("express");
const app = express();


app.use(express.json());


//-------------------------Routes---------------------------------
const product = require("./routes/product.route");
// const user = require("./routes/userRoute");

// app.use("/user", user);
app.use("/", product);



module.exports = app;