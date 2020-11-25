const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { Op } = require("sequelize");
const db = require("../models");
const User = db.user;
const Store = db.store;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized! Please try logging in again",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin" || roles[i].name === "super-admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator" || roles[i].name === "super-admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

isSuperAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "super-admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Super Admin Role!",
      });
      return;
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (
          roles[i].name === "admin" ||
          roles[i].name === "moderator" ||
          roles[i].name === "super-admin"
        ) {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};

isValidDomainAndStore = (req, res, next) => {
  Store.findOne({
    where: {
      [Op.and]: [{ storeId: req.body.storeid, domainKey: req.hostname }],
    },
  })
    .then((store) => {
      console.log(store);
      if (store) {
        next();
        return;
      } else {
        res.status(403).send({
          message: "Server Not Authorized",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  console.log(req.hostname, req);
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isValidDomainAndStore: isValidDomainAndStore,
  isSuperAdmin: isSuperAdmin,
};
module.exports = authJwt;
