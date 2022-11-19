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
   await queryInterface.bulkInsert('Playlists', [
    {
      // id: 1,
      name: 'All my favs',
      userId: 1,
      imageUrl: 'All my favs playlist picture'
    },
    {
      // id: 2,
      name: 'Oldies',
      userId: 1,
      imageUrl: 'Oldies playlist picture'
    },
    {
      // id: 3,
      name: 'My list got the playss',
      userId: 2,
      imageUrl: "My list playlist picture"
    },
    {
      // id: 4,
      name: 'Classics',
      userId: 3,
      imageUrl: 'Classics playlist picture'
    },
    {
      // id: 5,
      name: 'Party Pack',
      userId: 3,
      imageUrl: 'Party Pack playlist picture'
    },
    {
      // id: 6,
      name: 'Road trip',
      userId: 3,
      imageUrl: "Road trip playlist picture"
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
     await queryInterface.bulkDelete('Playlists', null, {})
  }
};
