'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('PlaylistSongs', [
    {
      songId: 1,
      playlistId: 1
    },
    {
      songId: 2,
      PlaylistId: 3
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('People', null, {});
  }
};
