module.exports = (sequelize, Sequelize) => {
  const Store = sequelize.define("store", {
    storeId: {
      type: Sequelize.STRING,
    },
    storeName: {
      type: Sequelize.STRING,
    },
    storeCategory: {
      type: Sequelize.STRING,
    },
    pan: {
      type: Sequelize.STRING,
    },
    gst: {
      type: Sequelize.STRING,
    },
  });

  return Store;
};
