"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Store.belongsTo(models.Store, {
      //   foreignKey: "storeId",
      // });
    }
  }
  Store.init(
    {
      storeId: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      storeName: DataTypes.STRING,
      storeCategory: DataTypes.STRING,
      pan: DataTypes.STRING,
      gst: DataTypes.STRING,
      domainKey: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
