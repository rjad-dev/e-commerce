'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          password: 'Hello@123',
          email: 'johndoe@email.com',
          first_name: 'John',
          last_name: 'Doe',
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          password: 'Admin@123',
          email: 'admin@email.com',
          first_name: 'Jane',
          last_name: 'Admin',
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};