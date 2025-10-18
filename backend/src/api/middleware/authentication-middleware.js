const UnauthorizedError =  require("../../domain/errors/unauthorized-error");

const isAuthenticated = (req, res, next) => {
  // console.log(req.auth()); // If the authorization header is not present or clerk Backend tells it is invalid, this will return null
  console.log("IS_AUTHENTICATED", req.auth().isAuthenticated);
  if (!req.auth().isAuthenticated) {
    throw new UnauthorizedError("Unauthorized");
  }
  next();
};

module.exports = isAuthenticated;