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

  //create Store [Moderator and Super Admin Route Only]
  app.post(
    "/api/auth/store",
    [authJwt.verifyToken, authJwt.isSuperAdminOrModerator],
    controller.createStore
  );

  // get all Stores [Super Admin Route Only]
  app.get(
    "/api/auth/stores",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    controller.allStores
  );

  // get store checks for valid domain and storeID [ Public / User Route]
  app.get(
    "/api/auth/store/:storeId",
    [authJwt.verifyToken, authJwt.isValidDomainAndStore],
    controller.getStore
  );

  // get store from domain [ Public / User Route]
  app.get("/api/getStoreInitially", controller.getStoreFromDomain);

  // delete store [Super Admin Route Only]
  app.delete(
    "/api/auth/store/:storeId",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    controller.deleteStore
  );
};
