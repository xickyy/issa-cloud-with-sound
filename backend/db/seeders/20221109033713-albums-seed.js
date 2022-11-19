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
   await queryInterface.bulkInsert('Albums', [
    {
      // id: 1,
      title: 'DAMN',
      userId: 1,
      description: 'Kendrick really made this album but lets throw Guy at it',
      imageUrl: 'DAMN album cover'
    },
    {
      // id: 2,
      title: 'Tickets to my downfall',
      userId: 2,
      description: 'Sad boii music',
      imageUrl: 'Downfall album cover'
    },
    {
      // id: 3,
      title: 'Swimming pools',
      userId: 3,
      description: 'RIP mac <3',
      imageUrl: 'Swimming pools album cover'
    },
    {
      // id: 4,
      title: 'OFWGKTA',
      userId: 1,
      description: 'Odd future wolf gang kill them all',
      imageUrl: 'OFWGKTA album cover'
    },
    {
      // id: 5,
      title: 'Graduation',
      userId: 3,
      description: 'Ye wit the yeez',
      imageUrl: 'Graduation album cover'
    },
    {
      // id: 6,
      title: 'Million dolla mission',
      userId: 3,
      description: 'frosty, the man of snow',
      imageUrl: 'Million dolla album'
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
     await queryInterface.bulkDelete('Albums', null, {})
  }
};
