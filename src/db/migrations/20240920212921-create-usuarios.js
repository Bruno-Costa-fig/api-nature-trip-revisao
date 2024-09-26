'use strict';

const { User } = require('../../models/User');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('Users', User.getAttributes());
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Users');
  }
};
