const NotFoundError = require("../../domain/errors/not-found-error.js");
const ValidationError = require("../../domain/errors/validation-error.js");
const UnauthorizedError = require("../../domain/errors/unauthorized-error.js");

const globalErrorHandlingMiddleware = (error, req, res, next) => {
  console.log(error);
  if (error instanceof NotFoundError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else if (error instanceof ValidationError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else if (error instanceof UnauthorizedError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = globalErrorHandlingMiddleware;