"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Store, {
        //through: models.Store,
        foreignKey: "storeId",
      });
    }
  }
  Products.init(
    {
      storeId: DataTypes.STRING,
      uuid: DataTypes.STRING,
      title: DataTypes.STRING,
      perm_link: DataTypes.STRING,
      short_details: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.STRING,
      sale_price: DataTypes.STRING,
      sale: DataTypes.STRING,
      stock: DataTypes.STRING,
      quantity: DataTypes.STRING,
      weight: DataTypes.STRING,
      dimension_length: DataTypes.STRING,
      dimension_width: DataTypes.STRING,
      dimension_height: DataTypes.STRING,
      sku: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
