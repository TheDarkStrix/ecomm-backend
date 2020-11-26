const { authJwt } = require("../middleware");
const controller = require("../controllers/products.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/createProduct",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.createProducts
  );

  app.get(
    "/api/auth/allProducts",
    [authJwt.verifyToken],
    controller.allProducts
  );

  app.delete(
    "/api/auth/product",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.deleteProducts
  );
};
