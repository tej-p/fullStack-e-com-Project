const HandleError = require("../utils/handleError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Issue.";


//   // Mongoose duplicate key error
//   if (err.code === 11000) {
//     const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
//     err = new ErrorHandler(message, 400);
//   }

//   // Wrong JWT error
//   if (err.name === "JsonWebTokenError") {
//     const message = `Json Web Token is invalid, Try again `;
//     err = new ErrorHandler(message, 400);
//   }

//   // JWT EXPIRE error
//   if (err.name === "TokenExpiredError") {
//     const message = `Json Web Token is Expired, Try again `;
//     err = new ErrorHandler(message, 400);
//   }

  res.status(err.statusCode).send({
    success: false,
    message: err.message,
    // message: err.stack, // will give the total detail of error where and what error has occured
  });
};