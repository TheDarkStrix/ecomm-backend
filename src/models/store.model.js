module.exports = (sequelize, Sequelize) => {
  const Store = sequelize.define("store", {
    storeId: {
      type: Sequelize.STRING,
      primaryKey: true,
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
    domainKey: {
      type: Sequelize.STRING,
    },
  });

  return Store;
};
