const db = require("../models");
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
exports.allProductsOfStore = (req, res) => {
  const storeId = req.params.storeId;
  console.log("AlL Products of a store");
  Products.findAll({
    attributes: ["id", "title", "sku", "price", "quantity", "active"],
    where: {
      storeId: storeId,
    },
  })
    .then((data) => {
      console.log(data);
      console.log(data.title);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteProducts = (req, res) => {
  const productId = req.params.productId;
  console.log("Delete Store");
  Products.findOne({
    where: {
      id: productId,
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
