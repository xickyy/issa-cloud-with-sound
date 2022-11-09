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
      songsId: 1,
      PlaylistId: 1
    },
    {
      songsId: 2,
      PlaylistId: 3
    },
    {
      songsId: 3,
      PlaylistId: 4
    },
    {
      songsId: 4,
      PlaylistId: 2
    },
    {
      songsId: 5,
      PlaylistId: 5
    },
    {
      songsId: 6,
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
