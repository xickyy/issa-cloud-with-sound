'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Comments'
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
      body: 'This song is awesome!',
      songId: 1,
      userId: 1
    },
    {
      // id: 2,
      body: 'you rock!',
      songId: 2,
      userId: 2
    },
    {
      // id: 3,
      body: 'Lemme get a feature!',
      songId: 3,
      userId: 3
    },
    {
      // id: 4,
      body: 'I wanna have your babies!',
      songId: 4,
      userId: 1
    },
    {
      // id: 5,
      body: 'Im gonna play this at my wedding!',
      songId: 5,
      userId: 3
    },{
      // id: 6,
      body: 'Fireeeeee!',
      songId: 6,
      userId: 3
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments'
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, null, {});
  }
};
