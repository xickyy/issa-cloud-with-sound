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
   await queryInterface.bulkInsert('Songs', [
    {
      id: 1,
      title: 'Hard work',
      description: 'RIP Juice <3',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 1,
      albumId: 3
    },
    {
      id: 2,
      title: 'Humble',
      description: 'Kendrick tha goat',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 1,
      albumId: 3
    },
    {
      id: 3,
      title: 'Hard work',
      description: 'RIP Juice <3',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 2,
      albumId: 3
    },
    {
      id: 4,
      title: 'Hard work',
      description: 'RIP Juice <3',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 2,
      albumId: 3
    },
    {
      id: 5,
      title: 'Hard work',
      description: 'RIP Juice <3',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 1,
      albumId: 3
    },
    {
      id: 6,
      title: 'Hard work',
      description: 'RIP Juice <3',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 1,
      albumId: 3
    },
    {
      id: 7,
      title: 'Hard work',
      description: 'RIP Juice <3',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 1,
      albumId: 3
    },
    {
      id: 8,
      title: 'Hard work',
      description: 'RIP Juice <3',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 1,
      albumId: 3
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
