'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      songId: 1,
      playlistId: 1
    },
    {
      songId: 2,
      playlistId: 3
    },
    {
      songId: 3,
      playlistId: 4
    },
    {
      songId: 4,
      playlistId: 2
    },
    {
      songId: 5,
      playlistId: 5
    },
    {
      songId: 6,
      playlistId: 6
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs'
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, null, {});
  }
};
