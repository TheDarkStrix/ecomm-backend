const db = require("../models");
const User = db.User;
const Stores = db.Store;
const Products = db.Products;
const { nanoid } = require("nanoid");

exports.createProducts = (req, res) => {
  Products.create({
    storeId: req.body.storeId,
    uuid: req.body.uuid,
    title: req.body.title,
    perm_link: req.body.perm_link,
    short_details: req.body.short_details,
    description: req.body.description,
    price: req.body.price,
    sale_price: req.body.sale_price,
    sale: req.body.sale,
    stock: req.body.stock,
    quantity: req.body.quantity,
    weight: req.body.weight,
    dimension_length: req.body.dl,
    dimension_width: req.body.dw,
    dimension_height: req.body.dh,
    sku: req.body.sku,
    active: req.body.active,
  })
    .then((product) => {
      console.log(product);
      res.status(200).send({ message: "Product Created!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//get all products of a particular store
exports.allProducts = (req, res) => {
  console.log("AlL Products");
  Products.findAll({
    where: {
      storeId: req.body.storeId,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// exports.allStores = (req, res) => {
//   console.log("AlL STORES");
//   Stores.findAll()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };

// exports.getStore = (req, res) => {
//   console.log("Single Store");
//   Stores.findOne({
//     where: {
//       storeId: req.body.storeid,
//     },
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };

exports.deleteProducts = (req, res) => {
  console.log("Delete Store");
  Products.findOne({
    where: {
      id: req.body.productId,
    },
  })
    .then((data) => {
      data.destroy();
      res.send("Deleted Product " + data.id);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// exports.getStoreFromDomain = (req, res) => {
//   console.log("HOST", req.hostname);
//   Stores.findOne({
//     where: {
//       domainKey: req.hostname,
//     },
//   })
//     .then((data) => {
//       console.log(data);
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };
