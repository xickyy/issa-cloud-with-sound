'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Songs'
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
      // id: 1,
      title: 'Hard work',
      description: 'RIP Juice <3',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 1,
      albumId: 1
    },
    {
      // id: 2,
      title: 'Humble',
      description: 'Kendrick tha goat',
      url: 'Humble url',
      imageUrl: 'Humble image',
      userId: 2,
      albumId: 2
    },
    {
      // id: 3,
      title: 'Love letter',
      description: 'I wrote this song in a love letter',
      url: 'Love letter url',
      imageUrl: 'Love letter image',
      userId: 3,
      albumId: 3
    },
    {
      // id: 4,
      title: 'And to those i love, thanks for sticking around',
      description: 'Take me homeee',
      url: 'And to those i love url',
      imageUrl: 'And to those i love image',
      userId: 1,
      albumId: 4
    },
    {
      // id: 5,
      title: 'ZaZa',
      description: 'Flexin',
      url: 'ZaZa url',
      imageUrl: 'ZaZa image',
      userId: 3,
      albumId: 5
    },
    {
      // id: 6,
      title: 'Waves',
      description: 'Im a god',
      url: 'Waves url',
      imageUrl: 'Waves image',
      userId: 3,
      albumId: 6
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Songs'
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, null, {});
  }
};
