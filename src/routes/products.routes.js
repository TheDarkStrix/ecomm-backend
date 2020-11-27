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

  // create a product [Moderator or Admin or Super Admin Route]
  app.post(
    "/api/auth/product",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.createProducts
  );

  // get all products of a store [Public / User Route]
  app.get(
    "/api/auth/products/:storeId",
    [authJwt.verifyToken],
    controller.allProductsOfStore
  );

  // delete product [Moderator or Admin or Super Admin Route]
  app.delete(
    "/api/auth/product/:productId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.deleteProducts
  );
};
