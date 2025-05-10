'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_Items', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id'
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('cart_Items', ['cart_id'], {
      name: 'cart_items_cart_id',
    });

    await queryInterface.addIndex('cart_Items', ['product_id'], {
      name: 'cart_items_product_id',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('cart_Items', 'cart_items_cart_id');
    await queryInterface.removeIndex('cart_Items', 'cart_items_product_id');
    await queryInterface.dropTable('cart_Items');
  }
};