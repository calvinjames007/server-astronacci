'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataVideo = JSON.parse(fs.readFileSync('./db/youtubeDB.json', 'utf-8')).map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      delete el.id;
      return el;
    })

    await queryInterface.bulkInsert('Videos', dataVideo);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Videos', dataVideo)
  }
};
