const db = require("../models");
const User = db.User;
const Stores = db.Store;
const { nanoid } = require("nanoid");

exports.createStore = async (req, res) => {
  console.log("createStore");
  Stores.create({
    storeId: await nanoid(10),
    storeName: req.body.storename,
    storeCategory: req.body.storecategory,
    pan: req.body.pan,
    gst: req.body.gst,
    domainKey: req.body.domainkey,
  })
    .then((user) => {
      res.send(user);
      User.findOne({
        where: {
          username: req.body.username,
        },
      }).then((user) => {
        console.log("working");
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.allStores = (req, res) => {
  console.log("AlL STORES");
  Stores.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getStore = (req, res) => {
  console.log("Single Store");
  Stores.findOne({
    where: {
      storeId: req.body.storeid,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteStore = (req, res) => {
  console.log("Delete Store");
  Stores.findOne({
    where: {
      storeId: req.body.storeid,
    },
  })
    .then((data) => {
      data.destroy();
      res.send("Deleted Store " + data.storeId);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getStoreFromDomain = (req, res) => {
  console.log("HOST", req.hostname);
  Stores.findOne({
    where: {
      domainKey: req.hostname,
    },
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
