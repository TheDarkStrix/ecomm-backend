const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/store.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/createStore",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.createStore
  );

  app.get(
    "/api/auth/allStores",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allStores
  );

  // Client Get Store -> domain and Storeid is validated
  app.get(
    "/api/auth/store",
    [authJwt.verifyToken, authJwt.isValidDomainAndStore],
    controller.getStore
  );

  // app.put(
  //   "/api/admin/auth/store",
  //   [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  //   controller.updateStoreAdmin
  // );

  // Client Update Store -> domain and Storeid is validated
  // app.put("/api/auth/store", [
  //   authJwt.verifyToken,
  //   authJwt.isValidDomainAndStore,
  // ]);

  app.get("/api/getStoreInitially", controller.getStoreFromDomain);

  app.delete(
    "/api/auth/deleteStore",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteStore
  );
};
