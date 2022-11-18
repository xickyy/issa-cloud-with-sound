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
      PlaylistId: 1
    },
    {
      songId: 2,
      PlaylistId: 3
    },
    {
      songId: 3,
      PlaylistId: 4
    },
    {
      songId: 4,
      PlaylistId: 2
    },
    {
      songId: 5,
      PlaylistId: 5
    },
    {
      songId: 6,
      PlaylistId: 6
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
