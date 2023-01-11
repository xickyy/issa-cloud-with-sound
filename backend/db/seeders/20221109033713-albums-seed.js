'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Albums'
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
      title: 'DAMN',
      userId: 1,
      description: 'Kendrick really made this album but lets throw Guy at it',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png'
    },
    {
      // id: 2,
      title: 'Tickets to my downfall',
      userId: 2,
      description: 'Sad boii music',
      imageUrl: 'https://musicmayhemmagazine.com/wp-content/uploads/2020/09/album-800x800.jpg'
    },
    {
      // id: 3,
      title: 'Swimming pools',
      userId: 3,
      description: 'RIP mac <3',
      imageUrl: 'https://mupo.ir/StaticFiles/Albums/fullSize/146909229616517965.jpg'
    },
    {
      // id: 4,
      title: 'OFWGKTA',
      userId: 1,
      description: 'Odd future wolf gang kill them all',
      imageUrl: 'https://m.media-amazon.com/images/I/51wXEpoHKrL._SY1000_.jpg'
    },
    {
      // id: 5,
      title: 'Graduation',
      userId: 3,
      description: 'Ye wit the yeez',
      imageUrl: 'https://routenote.com/blog/wp-content/uploads/2022/08/best-album-cover-arts-kanye-west-graduation.png'
    },
    {
      // id: 6,
      title: 'Million dolla mission',
      userId: 3,
      description: 'frosty, the man of snow',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273cae641e9dc4d8d41af9088ec'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Albums'
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, null, {})
  }
};
