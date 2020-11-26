"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      perm_link: {
        type: Sequelize.STRING,
      },
      short_details: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      sale_price: {
        type: Sequelize.STRING,
      },
      sale: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.STRING,
      },
      dimension_length: {
        type: Sequelize.STRING,
      },
      dimension_width: {
        type: Sequelize.STRING,
      },
      dimension_height: {
        type: Sequelize.STRING,
      },
      sku: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Products");
  },
};
